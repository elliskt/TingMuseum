<template>
  <div class="aiLanguage">
    <v-shell
      :banner="banner"
      :shell_input="send_to_terminal"
      :commands="commands"
      @shell_output="prompt"
      class="shell"
    ></v-shell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: window.urls,
      send_to_terminal: "",
      banner: {
        header: "AI Romance",
        subHeader: "Say something romantic to me (You are beautiful. etc.) ",
        helpHeader: "",
        emoji: {
          first: "",
          second: "",
          time: 750,
        },
        sign: "Text Generator $",
      },
      commands: [
        {
          name: "usage",
          desc: "Show information about this terminal",
          get() {
            return `<p>You can say anything in terminal,then AI model will reply your question.</p>`;
          },
        },
      ],
    };
  },
  computed: {
    lolo: {
      get() {
        return this.haha;
      },
    },
  },
  methods: {
    async prompt(value) {
      console.log("value:", value);
      this.send_to_terminal = "-*-*-*- please wait a sec... -*-*-*-\n" + "\n";
      var formData = new FormData();
      formData.append("prompt", value);
      await this.$axios
        .post(this.url + "gpt3_romance_api", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.send_to_terminal =
            "\n" +
            res.data.text +
            "\n" +
            `---------------- by π―πΎπββ³ππβ―ππ ---------------- `;
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/stylesheet/AILanguage.less";
</style>
