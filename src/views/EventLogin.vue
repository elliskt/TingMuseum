<template>
    <div class="eventLogin animate__animated animate__fadeIn">
        <div class="header">
            <div class="logo">
                <img src="../assets/TT/切图/2x/资源 1.svg" alt="" />
            </div>
            <div v-if="connectStatus" class="disconnect" @click="disconnectWalletConnect">
                Disconnect
            </div>
        </div>
        <div v-if="!connectStatus" class="beforeConnect animate__animated animate__fadeIn">
            <el-popconfirm @confirm="confirm" confirm-button-text='Confirm' cancel-button-text='Cancel'
                icon="el-icon-info" popper-class="walletconnectConfirm" icon-color="red"
                :title="buttonForMumbaiOrEth ? 'Please make sure your wallet has changed to Ethereum Network before login.' : 'Please make sure your wallet has changed to Mumbai Network before login.'">
                <div class="connect" slot="reference">
                    Connect WalletConnect
                </div>
            </el-popconfirm>
        </div>
        <div v-if="connectStatus" class="mint_container animate__animated animate__fadeIn">
            <span>Your address is:</span>
            <h2>{{ address }}</h2>
            <video src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/model-source/eth2022_vietnam.mp4" autoplay
                muted loop></video>
            <el-button v-if="!buttonForMumbaiOrEth" :loading="loading" class="mint" @click="mint">TestMint</el-button>
            <el-button v-if="buttonForMumbaiOrEth" :loading="loading" class="mint" @click="ethMint">Mint</el-button>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../components/footer.vue'
import 'animate.css'
import { connector } from '../walletConnect/connector'
import { mintContract } from '../utils/contract'
console.log('connector:', connector);
export default {
    components: {
        Footer
    },
    data() {
        return {
            connectStatus: false,
            walletConnectFlag: false,
            address: '',
            state: {
                address: "",
                chainId: "",
                status: false,
            },
            url: window.urls,
            loading: false,
            transactionParams: {

            },
            buttonForMumbaiOrEth: false
        };
    },
    watch: {
        walletConnectFlag(newValue) {
            console.log('walletConnectFlag有新值了:', newValue);
            if (newValue) {
                setTimeout(() => {
                    $('#walletconnect-wrapper').css({ 'z-index': '99999999999999', 'opacity': '1' })
                    if ($('#closeQrcodeModalBtn')) {
                        $('#closeQrcodeModalBtn').remove();
                        let closeBtn = '<div id="closeQrcodeModalBtn" style="opacity:0;z-index:999999;position: absolute;top: 0px;right: 0px;background: white;border-radius: 26px;padding: 6px;box-sizing: border-box;width: 26px;height: 26px;cursor: pointer; "></div>'
                        $('.walletconnect-modal__header').append(closeBtn)
                        $('#closeQrcodeModalBtn').on('click', () => {
                            console.log('2:');
                            $('#walletconnect-wrapper').css({ 'z-index': '-1', 'opacity': '0' })
                            this.walletConnectFlag = false;
                        })
                    }
                }, 500);
            }
        },
    },
    methods: {
        confirm() {
            this.walletConnect();
        },
        async mintToolCode(env) {
            this.loading = true;
            const { contract } = await mintContract();
            let api = '';
            if (env == 'mumbai') {
                api = 'eth_vietnam_mint_mumbai';
            } else {
                api = 'eth_vietnam_mint'
            }
            console.log('api:', api);
            await this.$axios.post(this.url + api, {
                mint_addr: this.address
            }).then((res) => {
                console.log('res:', res);
                this.transactionParams = res.data.transaction
                this.loading = false;
            })
            const tx = {
                from: this.transactionParams.from, // Required
                to: this.transactionParams.to, // Required (for non contract deployments)
                data: this.transactionParams.data, // Required
                gasPrice: (this.transactionParams.gasPrice).toString(), // Optional
                gas: (this.transactionParams.gas).toString(), // Optional
                value: (this.transactionParams.value).toString(), // Optional
                nonce: (this.transactionParams.nonce).toString(), // Optional
            };
            return tx;
        },
        async ethMint() {
            let tx = await this.mintToolCode('eth');
            try {
                await connector.sendTransaction(tx).then((res) => {
                    console.log('res:', res);
                })
            } catch (error) {
                console.log('error:', error);
            }
        },
        async mint() {
            let tx = await this.mintToolCode('mumbai');
            try {
                await connector.sendTransaction(tx).then((res) => {
                    console.log('res:', res);
                })
            } catch (error) {
                console.log('error:', error);
            }
        },
        async disconnectWalletConnect() {
            connector.killSession();
            this.connectStatus = false;
        },
        async connectWalletConnect() {
            try {
                if (!connector.connected) {
                    // create new session
                    connector.createSession();
                }
                // Subscribe to connection events
                connector.on("connect", (error, payload) => {
                    if (error) {
                        throw error;
                    }

                    // Get provided accounts and chainId
                    const { accounts, chainId } = payload.params[0];
                    console.log('connect accounts:', accounts);
                    console.log('connect chainId:', chainId);
                    this.address = accounts[0];
                    this.connectStatus = true;
                });

                connector.on("session_update", (error, payload) => {
                    if (error) {
                        throw error;
                    }

                    // Get updated accounts and chainId
                    const { accounts, chainId } = payload.params[0];
                    this.address = accounts[0];
                    this.connectStatus = true;
                    console.log('session_update accounts:', accounts);
                    console.log('session_update chainId:', chainId);
                });

                connector.on("disconnect", (error, payload) => {
                    if (error) {
                        throw error;
                    }

                    // Delete connector
                    console.log('disconnect connector!:');
                });

            } catch (error) {
                console.log(error);
            }
        },
        async walletConnect() {
            this.walletConnectFlag = true;
            await this.connectWalletConnect();
        },
    },
    created() {
        if (this.$route.path == '/event_login_test') {
            this.buttonForMumbaiOrEth = false
        } else {
            this.buttonForMumbaiOrEth = true
        }
        console.log('1:');
    },
    mounted() {
        if (window.localStorage.walletconnect) {
            this.address = JSON.parse(window.localStorage.walletconnect).accounts[0]
            this.connectStatus = true;
        }
    }
};
</script>

<style lang="less" scoped>
.eventLogin {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to right, #ec77ab 0%, #7873f5 100%);
    color: #fff;
    user-select: none;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .header {
        width: 100%;
        min-height: 4.9375rem;
        background-color: #010101;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & .logo {
            height: 2.9375rem;
            width: 10rem;
            cursor: pointer;

            img {
                height: 100%;
                width: 100%;
                -webkit-user-drag: none;

            }

        }

        & .disconnect {
            padding: 10px 20px;
            display: inline-block;
            transition: background ease .3s;
            cursor: pointer;
            border-radius: 16px;

            &:hover {
                background-color: #8a8b8b;
            }
        }
    }

    & .beforeConnect {
        width: 450px;
        height: 500px;
        background-color: #11192f;
        border-radius: 16px;
        margin: 0 auto;
        margin-top: 10vh;
        margin-bottom: 10vh;
        display: flex;
        align-items: center;
        justify-content: center;

        @media screen and (max-width:420px) {
            max-width: 380px;

        }

        @media screen and (max-width:380px) {
            max-width: 350px;

        }

        & .connect {
            margin: 0 auto;
            padding: 10px 20px;
            background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;

            @media screen and (max-width:380px) {
                width: 60%;

            }
        }

    }

    & .mint_container {
        max-width: 500px;
        max-height: 800px;
        background-color: #11192f;
        border-radius: 16px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 30px;
        margin-bottom: 10vh;
        margin-top: 10vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media screen and (max-width:420px) {
            max-width: 380px;

        }

        @media screen and (max-width:380px) {
            max-width: 350px;

        }

        & h2 {
            font-size: 1rem;
            margin-bottom: 5%;
            word-break: break-all;
            user-select: text;

            @media screen and (max-width:500px) {
                font-size: 12px;
            }
        }

        & video {
            width: 100%;
            height: 60%;
            border-radius: 12px;
            margin: 0 auto;
            object-fit: cover;

        }

        & .mint {
            margin: 0 auto;
            padding: 10px 60px;
            background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
            border-radius: 12px;
            text-align: center;
            margin-top: 10%;
            cursor: pointer;
            color: #fff;
            border: none;
        }
    }
}
</style>