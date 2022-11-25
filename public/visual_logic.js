'use strict';

(function() {

    // global variables/constants used by puzzles' functions

    var LIST_NONE = '<none>';

    var _pGlob = {};

    _pGlob.objCache = {};
    _pGlob.fadeAnnotations = true;
    _pGlob.pickedObject = '';
    _pGlob.hoveredObject = '';
    _pGlob.mediaElements = {};
    _pGlob.loadedFile = '';
    _pGlob.states = [];
    _pGlob.percentage = 0;
    _pGlob.openedFile = '';
    _pGlob.xrSessionAcquired = false;
    _pGlob.xrSessionCallbacks = [];
    _pGlob.screenCoords = new v3d.Vector2();
    _pGlob.intervalTimers = {};

    _pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
    _pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
    _pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
    _pGlob.MIN_DRAG_SCALE = 10e-4;
    _pGlob.SET_OBJ_ROT_EPS = 1e-8;

    _pGlob.vec2Tmp = new v3d.Vector2();
    _pGlob.vec2Tmp2 = new v3d.Vector2();
    _pGlob.vec3Tmp = new v3d.Vector3();
    _pGlob.vec3Tmp2 = new v3d.Vector3();
    _pGlob.vec3Tmp3 = new v3d.Vector3();
    _pGlob.vec3Tmp4 = new v3d.Vector3();
    _pGlob.eulerTmp = new v3d.Euler();
    _pGlob.eulerTmp2 = new v3d.Euler();
    _pGlob.quatTmp = new v3d.Quaternion();
    _pGlob.quatTmp2 = new v3d.Quaternion();
    _pGlob.colorTmp = new v3d.Color();
    _pGlob.mat4Tmp = new v3d.Matrix4();
    _pGlob.planeTmp = new v3d.Plane();
    _pGlob.raycasterTmp = new v3d.Raycaster();

    var PL = v3d.PL = v3d.PL || {};

    // a more readable alias for PL (stands for "Puzzle Logic")
    v3d.puzzles = PL;

    PL.procedures = PL.procedures || {};


    (function() {
        class e extends v3d.Object3D {
            constructor(e) { super(), this.element = e || document.createElement("div"), this.element.style.position = "absolute", this.element.style.pointerEvents = "auto", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.addEventListener("removed", function() { this.traverse(function(e) { e.element instanceof Element && null !== e.element.parentNode && e.element.parentNode.removeChild(e.element) }) }) }
            copy(e, t) { return super.copy(e, t), this.element = e.element.cloneNode(!0), this }
        }
        e.prototype.isCSS3DObject = !0;
        class t extends e {
            constructor(e) { super(e), this.rotation2D = 0 }
            copy(e, t) { return super.copy(e, t), this.rotation2D = e.rotation2D, this }
        }
        t.prototype.isCSS3DSprite = !0;
        const n = new v3d.Matrix4,
            s = new v3d.Matrix4;
        class i {
            constructor() {
                function e(e) { return Math.abs(e) < 1e-10 ? 0 : e }

                function t(t) { const n = t.elements; return "matrix3d(" + e(n[0]) + "," + e(-n[1]) + "," + e(n[2]) + "," + e(n[3]) + "," + e(n[4]) + "," + e(-n[5]) + "," + e(n[6]) + "," + e(n[7]) + "," + e(n[8]) + "," + e(-n[9]) + "," + e(n[10]) + "," + e(n[11]) + "," + e(n[12]) + "," + e(-n[13]) + "," + e(n[14]) + "," + e(n[15]) + ")" }

                function i(t) {
                    const n = t.elements,
                        s = "matrix3d(" + e(n[0]) + "," + e(n[1]) + "," + e(n[2]) + "," + e(n[3]) + "," + e(-n[4]) + "," + e(-n[5]) + "," + e(-n[6]) + "," + e(-n[7]) + "," + e(n[8]) + "," + e(n[9]) + "," + e(n[10]) + "," + e(n[11]) + "," + e(n[12]) + "," + e(n[13]) + "," + e(n[14]) + "," + e(n[15]) + ")";
                    return "translate(-50%,-50%)" + s
                }

                function l(e, t, a, o) {
                    if (e.isCSS3DObject) {
                        let l;
                        e.onBeforeRender(r, t, a), e.isCSS3DSprite ? (n.copy(a.matrixWorldInverse), n.transpose(), 0 !== e.rotation2D && n.multiply(s.makeRotationZ(e.rotation2D)), n.copyPosition(e.matrixWorld), n.scale(e.scale), n.elements[3] = 0, n.elements[7] = 0, n.elements[11] = 0, n.elements[15] = 1, l = i(n)) : l = i(e.matrixWorld);
                        const o = e.element,
                            c = h.objects.get(e);
                        if (void 0 === c || c.style !== l) {
                            o.style.transform = l;
                            const t = { style: l };
                            h.objects.set(e, t)
                        }
                        o.style.display = e.visible ? "" : "none", o.parentNode !== p && p.appendChild(o), e.onAfterRender(r, t, a)
                    }
                    for (let n = 0, s = e.children.length; n < s; n++) l(e.children[n], t, a, o)
                }
                const r = this;
                let a, o, c, d;
                const h = { camera: { fov: 0, style: "" }, objects: new WeakMap },
                    m = document.createElement("div");
                m.style.overflow = "hidden", this.domElement = m;
                const p = document.createElement("div");
                p.style.transformStyle = "preserve-3d", p.style.pointerEvents = "none", m.appendChild(p), this.getSize = function() { return { width: a, height: o } }, this.render = function(n, s) {
                    const i = s.projectionMatrix.elements[5] * d;
                    let r, a;
                    h.camera.fov !== i && (m.style.perspective = s.isPerspectiveCamera ? i + "px" : "", h.camera.fov = i), !0 === n.autoUpdate && n.updateMatrixWorld(), null === s.parent && s.updateMatrixWorld(), s.isOrthographicCamera && (r = -(s.right + s.left) / 2, a = (s.top + s.bottom) / 2);
                    const o = s.isOrthographicCamera ? "scale(" + i + ")translate(" + e(r) + "px," + e(a) + "px)" + t(s.matrixWorldInverse) : "translateZ(" + i + "px)" + t(s.matrixWorldInverse),
                        u = o + "translate(" + c + "px," + d + "px)";
                    h.camera.style !== u && (p.style.transform = u, h.camera.style = u), l(n, n, s, o)
                }, this.setSize = function(e, t) { a = e, o = t, c = a / 2, d = o / 2, m.style.width = e + "px", m.style.height = t + "px", p.style.width = e + "px", p.style.height = t + "px" }
            }
        }
        class l extends e {
            constructor(e) { super(), this.app = null, this.material = null, this.renderSide = "visible", this.scene = null, this.iframe = null, this.background = "transparent", this.width = 540, this.height = 360, this.scaleDown = .01, Object.assign(this, e), this._init() }
            _init() {
                let e, t, n = this;
                n.element.id = n.name + "Div", n.element.style.overflow = "hidden", n.element.style.pointerEvents = "auto", n.element.style.backfaceVisibility = n.renderSide, n.element.style.background = n.background, n.element.style.width = n.width + "px", n.element.style.height = n.height + "px", n.element.style.cursor = "pointer", n.element.innerHTML = n.iframe, n.element.children[0].style.height = "100%", n.element.children[0].style.width = "100%", n.element.children[0].style.padding = "0", n.element.children[0].style.margin = "0", n.element.children[0].style.lineHeight = n.height + "px", e = new v3d.PlaneBufferGeometry(n.width, n.height, 1, 1), t = new v3d.Mesh(e, n.material), t.name = n.name, n.app && n.app.scene.add(t), t.scale.set(2 * n.scaleDown, 2 * n.scaleDown, 2 * n.scaleDown), n.scene.add(n), n.app.renderCallbacks.push(function() { n.copyTransform(t), n.updateMatrixWorld(!0), t.visible ? n.element.style.display = "block" : n.element.style.display = "none" })
            }
            remove() { this.app.scene.remove(this.app.scene.getObjectByName(this.name)), this.scene.remove(this.scene.getObjectByName(this.name)) }
        }
        class r extends l { constructor(e) { super(e), this.YTPlayer = new YT.Player(this.element.children[0]), this.isYTPlayer = !0, Object.assign(this, e) } }
        class a extends l { constructor(e) { super(e), this.vimeoPlayer = new Vimeo.Player(this.element.children[0]), this.isViemoPlayer = !0, Object.assign(this, e) } }
        v3d.CSS3DRenderer = i, v3d.CSS3DPlane = l, v3d.CSS3DPlaneYouTube = r, v3d.CSS3DPlaneVimeo = a
    })();

    _pGlob.css3d = {
        scene: null,
        objs: [],
        raycaster: new v3d.Raycaster()
    };

    // utility function for css3d plugin
    function getCss3dByName(name) {
        return _pGlob.css3d.objs.find(item => item.name === name);
    }

    PL.execInitPuzzles = function(options) {
        // always null, should not be available in "init" puzzles
        var appInstance = null;
        // app is more conventional than appInstance (used in exec script and app templates)
        var app = null;

        var _initGlob = {};
        _initGlob.percentage = 0;
        _initGlob.output = {
            initOptions: {
                fadeAnnotations: true,
                useBkgTransp: false,
                preserveDrawBuf: false,
                useCompAssets: false,
                useFullscreen: true,
                useCustomPreloader: false,
                preloaderStartCb: function() {},
                preloaderProgressCb: function() {},
                preloaderEndCb: function() {},
                percentageForloading: ''
            }
        }

        // provide the container's id to puzzles that need access to the container
        _initGlob.container = options !== undefined && 'container' in options ?
            options.container : "";



        var PROC = {

        };


        // var percentageForloading ;


        //jk33

        // utility functions envoked by the HTML puzzles
        function getElements(ids, isParent) {
            var elems = [];
            if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
                ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
                for (var i = 0; i < ids.length; i++)
                    elems.push(getElement(ids[i], isParent));
            } else {
                elems.push(getElement(ids, isParent));
            }
            return elems;
        }

        function getElement(id, isParent) {
            var elem;
            if (Array.isArray(id) && id[0] == 'CONTAINER') {
                if (appInstance !== null) {
                    elem = appInstance.container;
                } else if (typeof _initGlob !== 'undefined') {
                    // if we are on the initialization stage, we still can have access
                    // to the container element
                    var id = _initGlob.container;
                    if (isParent) {
                        elem = parent.document.getElementById(id);
                    } else {
                        elem = document.getElementById(id);
                    }
                }
            } else if (Array.isArray(id) && id[0] == 'WINDOW') {
                if (isParent)
                    elem = parent;
                else
                    elem = window;
            } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
                if (isParent)
                    elem = parent.document;
                else
                    elem = document;
            } else if (Array.isArray(id) && id[0] == 'BODY') {
                if (isParent)
                    elem = parent.document.body;
                else
                    elem = document.body;
            } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
                if (isParent)
                    elem = parent.document.querySelector(id);
                else
                    elem = document.querySelector(id);
            } else {
                if (isParent)
                    elem = parent.document.getElementById(id);
                else
                    elem = document.getElementById(id);
            }
            return elem;
        }



        // getHTMLElemStyle puzzle
        function getHTMLElemStyle(prop, id, isParent) {
            var elem = getElement(id, isParent);

            // try explicitly set style first
            if (elem && elem.style && elem.style[prop]) {
                return elem.style[prop];
            } else if (elem) {
                var win = isParent ? window.parent : window;
                return win.getComputedStyle(elem)[prop];
            } else
                return '';
        }

        // setHTMLElemStyle puzzle
        function setHTMLElemStyle(prop, value, ids, isParent) {
            var elems = getElements(ids, isParent);
            for (var i = 0; i < elems.length; i++) {
                var elem = elems[i];
                if (!elem || !elem.style)
                    continue;
                elem.style[prop] = value;
            }
        }


        // setHTMLElemAttribute puzzle
        function setHTMLElemAttribute(attr, value, ids, isParent) {
            var elems = getElements(ids, isParent);
            for (var i = 0; i < elems.length; i++) {
                var elem = elems[i];
                if (!elem) continue;

                if (attr === 'style') {
                    // NOTE: setting an attribute 'style' instead of a property 'style'
                    // fixes IE11 wrong behavior
                    elem.setAttribute(attr, value);
                } else if ((attr == 'href' || attr == 'src') && value instanceof Promise) {
                    // resolve promise value for url-based attributes
                    value.then(function(response) {
                        elem[attr] = response;
                    });
                } else {
                    elem[attr] = value;
                }
            }
        }


        // toFixedPoint puzzle
        function toFixedPoint(num, prec) {
            prec = Math.pow(10, prec);
            return Math.round(num * prec) / prec;
        }





        // initSettings puzzle
        _initGlob.output.initOptions.fadeAnnotations = true;
        _initGlob.output.initOptions.useBkgTransp = false;
        _initGlob.output.initOptions.preserveDrawBuf = true;
        _initGlob.output.initOptions.useCompAssets = false;
        _initGlob.output.initOptions.useFullscreen = false;

        // initPreloader puzzle
        _initGlob.output.initOptions.useCustomPreloader = true;

        _initGlob.output.initOptions.preloaderStartCb = function() {
            _initGlob.percentage = 0;
            (function() {
                setHTMLElemStyle('animation', 'show 0.2s 0s linear 1', 'simple-preloader-background', false);
                setHTMLElemStyle('animationFillMode', 'forwards', 'simple-preloader-background', false);
            })();
        };
        _initGlob.output.initOptions.preloaderProgressCb = function(percentage) {
            _initGlob.percentage = percentage;
            (function() {
                if (getHTMLElemStyle('width', ['QUERYSELECTOR', '.imgBoxc img'], false) != null) {
                    setHTMLElemStyle('backgroundColor', '#fff', ['QUERYSELECTOR', '.imgBoxc'], false);
                }
                setHTMLElemAttribute('innerHTML', String(toFixedPoint(Math.round(_initGlob.percentage) * 0.8, 1)) + '%', 'preloader-text', false);
            })();
        };
        _initGlob.output.initOptions.preloaderEndCb = function() {
            _initGlob.percentage = 100;


            (function() {
                v3d.percentageForloading = true;
                setHTMLElemStyle('animation', ['hide ', '1', 's 0s linear 1'].join(''), 'simple-preloader-background', false);
                setHTMLElemStyle('animationFillMode', 'forwards', 'simple-preloader-background', false);
                // return perLoad =_initGlob.percentageForloading;
                return v3d.percentageForloading
            })();

        };

        return _initGlob.output;
    }

    PL.init = function(appInstance, initOptions) {

            // app is more conventional than appInstance (used in exec script and app templates)
            var app = appInstance;

            initOptions = initOptions || {};

            if ('fadeAnnotations' in initOptions) {
                _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
            }

            this.procedures["myProcedures"] = myProcedures;
            this.procedures["firstIntoPic"] = firstIntoPic;
            this.procedures["showedMake"] = showedMake;
            this.procedures["getNowshowed"] = getNowshowed;
            this.procedures["closeMsgBox"] = closeMsgBox;
            this.procedures["preFaction"] = preFaction;
            this.procedures["savePack"] = savePack;
            this.procedures["ChangeImg"] = ChangeImg;
            this.procedures["closeAset"] = closeAset;
            this.procedures["switchProduct"] = switchProduct;
            this.procedures["getNowproduct"] = getNowproduct;


            //com:=>新建的创建html模型的方法
            //com:=>调用方法:`v3d.puzzles.procedures.[方法名]`

            //com:=>createHTMLmodel (modelname:创建的模型的id或名称, linkUrl:需要嵌入的链接, modelWidth:模型的宽度, modelHeight:模型的高度, modelScale:模型的缩放)
            this.procedures['createHTMLmodel'] = createHTMLmodel;

            //com:=>contarlCreateModel(contarlmodel:选择控制模式['position'（位置移动控制）||'rotation'（旋转控制）], x: X轴移动数值 ,y: Y轴移动数值 ,z:Z轴移动数值 )
            this.procedures['contarlCreateModel'] = contarlCreateModel;

            this.procedures["upTip"] = upTip;
            this.procedures["replaceScreen"] = replaceScreen;
            this.procedures["createJoystickey"] = createJoystickey;
            this.procedures["joyEvent"] = joyEvent;
            this.procedures["getJoystickById"] = getJoystickById;





            // this.procedures["getNowLoaded"] = getNowLoaded;

            var PROC = {
                'replaceScreen': 'replaceScreen',
                "upTip": upTip,
                "myProcedures": myProcedures,
                "firstIntoPic": firstIntoPic,
                "showedMake": showedMake,
                "getNowshowed": getNowshowed,
                "closeMsgBox": closeMsgBox,
                "preFaction": preFaction,
                "savePack": savePack,
                "ChangeImg": ChangeImg,
                "closeAset": closeAset,
                "switchProduct": switchProduct,
                "getNowproduct": getNowproduct,
                // "getNowLoaded":getNowLoaded,
            };

            var modelCreate, editJson, cip, cname, resivenow, this_URL, i, usershowedURL, nowSelected, talData, selectObj, swpro_SizeAs, usingURL, ExhibitionHall_ID, Data_shouldbeshow, dame, newableItem, k, camera_intial, videoPretake, lookItem, imgInstent, model_Hstorylist, camera_Target, DeviceInformation, j, first_State, playState, changeSelect, camera_Point, isthisVideo, Collision_Product_ID, gifInstent, v_switchTime, video_SizeAs, pic_SizeAs, switchHistory, htmlInstent, svgInstent, 播放状态, cameraMoveStatus;


            // utility function used by the whenClicked, whenHovered and whenDraggedOver puzzles
            function initObjectPicking(callback, eventType, mouseDownUseTouchStart, mouseButtons) {

                var elem = appInstance.renderer.domElement;
                elem.addEventListener(eventType, pickListener);
                if (v3d.PL.editorEventListeners)
                    v3d.PL.editorEventListeners.push([elem, eventType, pickListener]);

                if (eventType == 'mousedown') {

                    var touchEventName = mouseDownUseTouchStart ? 'touchstart' : 'touchend';
                    elem.addEventListener(touchEventName, pickListener);
                    if (v3d.PL.editorEventListeners)
                        v3d.PL.editorEventListeners.push([elem, touchEventName, pickListener]);

                } else if (eventType == 'dblclick') {

                    var prevTapTime = 0;

                    function doubleTapCallback(event) {

                        var now = new Date().getTime();
                        var timesince = now - prevTapTime;

                        if (timesince < 600 && timesince > 0) {

                            pickListener(event);
                            prevTapTime = 0;
                            return;

                        }

                        prevTapTime = new Date().getTime();
                    }

                    var touchEventName = mouseDownUseTouchStart ? 'touchstart' : 'touchend';
                    elem.addEventListener(touchEventName, doubleTapCallback);
                    if (v3d.PL.editorEventListeners)
                        v3d.PL.editorEventListeners.push([elem, touchEventName, doubleTapCallback]);
                }

                var raycaster = new v3d.Raycaster();

                function pickListener(event) {

                    // to handle unload in loadScene puzzle
                    if (!appInstance.getCamera())
                        return;

                    event.preventDefault();

                    var xNorm = 0,
                        yNorm = 0;
                    if (event instanceof MouseEvent) {
                        if (mouseButtons && mouseButtons.indexOf(event.button) == -1)
                            return;
                        xNorm = event.offsetX / elem.clientWidth;
                        yNorm = event.offsetY / elem.clientHeight;
                    } else if (event instanceof TouchEvent) {
                        var rect = elem.getBoundingClientRect();
                        xNorm = (event.changedTouches[0].clientX - rect.left) / rect.width;
                        yNorm = (event.changedTouches[0].clientY - rect.top) / rect.height;
                    }

                    _pGlob.screenCoords.x = xNorm * 2 - 1;
                    _pGlob.screenCoords.y = -yNorm * 2 + 1;
                    raycaster.setFromCamera(_pGlob.screenCoords, appInstance.getCamera(true));
                    var objList = [];
                    appInstance.scene.traverse(function(obj) { objList.push(obj); });
                    var intersects = raycaster.intersectObjects(objList);
                    callback(intersects, event);
                }
            }

            function objectsIncludeObj(objNames, testedObjName) {
                if (!testedObjName) return false;

                for (var i = 0; i < objNames.length; i++) {
                    if (testedObjName == objNames[i]) {
                        return true;
                    } else {
                        // also check children which are auto-generated for multi-material objects
                        var obj = getObjectByName(objNames[i]);
                        if (obj && obj.type == "Group") {
                            for (var j = 0; j < obj.children.length; j++) {
                                if (testedObjName == obj.children[j].name) {
                                    return true;
                                }
                            }
                        }
                    }
                }
                return false;
            }

            // utility function used by the whenClicked, whenHovered, whenDraggedOver, and raycast puzzles
            function getPickedObjectName(obj) {
                // auto-generated from a multi-material object, use parent name instead
                if (obj.isMesh && obj.isMaterialGeneratedMesh && obj.parent) {
                    return obj.parent.name;
                } else {
                    return obj.name;
                }
            }
            (function() {
                _pGlob.css3d.instance = [];
                _pGlob.css3d.scene = new v3d.Scene();
                _pGlob.css3d.renderer = new v3d.CSS3DRenderer();
                _pGlob.css3d.renderer.setSize(window.innerWidth, window.innerHeight);
                _pGlob.css3d.renderer.domElement.style.position = 'absolute';
                _pGlob.css3d.renderer.domElement.style.top = 0;
                _pGlob.css3d.renderer.domElement.style.zIndex = -1;
                _pGlob.css3d.renderer.domElement.id = 'css3d-container';
                appInstance.renderer.domElement.insertAdjacentElement('beforebegin', _pGlob.css3d.renderer.domElement);

                window.addEventListener("resize", resize);
                document.addEventListener('webkitfullscreenchange', resize);
                document.addEventListener('mozfullscreenchange', resize);
                document.addEventListener('msfullscreenchange', resize);
                document.addEventListener('fullscreenchange', resize);

                function resize() {
                    _pGlob.css3d.renderer.setSize(appInstance.getWidth(), appInstance.getHeight());
                };

                appInstance.renderCallbacks.push(function() {
                    if (_pGlob.css3d.scene.children.length) {
                        appInstance.render();
                        _pGlob.css3d.renderer.render(_pGlob.css3d.scene, appInstance.camera);
                    }
                });
            })()

            function createCss3dObject(option) {
                const oldObj = appInstance.scene.getObjectByName(option.name);
                const oldC3dObj = _pGlob.css3d.scene.getObjectByName(option.name);
                if (oldObj || oldC3dObj) {
                    oldObj.parent.remove(oldObj);
                    _pGlob.css3d.scene.remove(oldC3dObj);
                }

                let material, renderSide, c3dObj;

                switch (option.display) {
                    case 'DISPLAY_MASK':
                        material = new v3d.MeshBasicMaterial({
                            color: 'black',
                            opacity: 0,
                            blending: v3d.NoBlending
                        });
                        break;
                    case 'DISPLAY_SOLID':
                        material = new v3d.MeshBasicMaterial({
                            color: option.color
                        });
                        break;
                    case 'DISPLAY_WIREFRAME':
                        material = new v3d.MeshBasicMaterial({
                            color: 'black'
                        });
                        material.wireframe = true;
                        break;
                }
                switch (option.renderSide) {
                    case 'RENDER_FRONT':
                        material.side = v3d.FrontSide;
                        renderSide = 'hidden';
                        break;
                    case 'RENDER_DOUBLE':
                        material.side = v3d.DoubleSide;
                        renderSide = 'visible';
                        break;
                }

                const args = {
                    name: option.name,
                    app: appInstance,
                    material: material,
                    renderSide: renderSide,
                    scene: _pGlob.css3d.scene,
                    iframe: option.iframe,
                    background: option.background,
                    width: option.width,
                    height: option.height,
                    scaleDown: option.scale,
                }
                if (!_pGlob.css3d.YouTubeId && !_pGlob.css3d.VimeoId) {
                    c3dObj = new v3d.CSS3DPlane(args);
                } else if (_pGlob.css3d.YouTubeId) {
                    c3dObj = new v3d.CSS3DPlaneYouTube(args);
                } else if (_pGlob.css3d.VimeoId) {
                    c3dObj = new v3d.CSS3DPlaneVimeo(args);
                }
                console.log(c3dObj);
                _pGlob.objCache = {};
                _pGlob.css3d.objs.push(c3dObj);

            }


            // utility function envoked by almost all V3D-specific puzzles
            // filter off some non-mesh types
            function notIgnoredObj(obj) {
                return obj.type !== 'AmbientLight' &&
                    obj.name !== '' &&
                    !(obj.isMesh && obj.isMaterialGeneratedMesh) &&
                    !obj.isAuxClippingMesh;
            }


            // utility function envoked by almost all V3D-specific puzzles
            // find first occurence of the object by its name
            function getObjectByName(objName) {
                var objFound;
                var runTime = _pGlob !== undefined;
                objFound = runTime ? _pGlob.objCache[objName] : null;

                if (objFound && objFound.name === objName)
                    return objFound;

                appInstance.scene.traverse(function(obj) {
                    if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
                        objFound = obj;
                        if (runTime) {
                            _pGlob.objCache[objName] = objFound;
                        }
                    }
                });
                return objFound;
            }


            // utility function envoked by almost all V3D-specific puzzles
            // retrieve all objects on the scene
            function getAllObjectNames() {
                var objNameList = [];
                appInstance.scene.traverse(function(obj) {
                    if (notIgnoredObj(obj))
                        objNameList.push(obj.name)
                });
                return objNameList;
            }


            // utility function envoked by almost all V3D-specific puzzles
            // retrieve all objects which belong to the group
            function getObjectNamesByGroupName(targetGroupName) {
                var objNameList = [];
                appInstance.scene.traverse(function(obj) {
                    if (notIgnoredObj(obj)) {
                        var groupNames = obj.groupNames;
                        if (!groupNames)
                            return;
                        for (var i = 0; i < groupNames.length; i++) {
                            var groupName = groupNames[i];
                            if (groupName == targetGroupName) {
                                objNameList.push(obj.name);
                            }
                        }
                    }
                });
                return objNameList;
            }


            // utility function envoked by almost all V3D-specific puzzles
            // process object input, which can be either single obj or array of objects, or a group
            function retrieveObjectNames(objNames) {
                var acc = [];
                retrieveObjectNamesAcc(objNames, acc);
                return acc.filter(function(name) {
                    return name;
                });
            }

            function retrieveObjectNamesAcc(currObjNames, acc) {
                if (typeof currObjNames == "string") {
                    acc.push(currObjNames);
                } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
                    var newObj = getObjectNamesByGroupName(currObjNames[1]);
                    for (var i = 0; i < newObj.length; i++)
                        acc.push(newObj[i]);
                } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
                    var newObj = getAllObjectNames();
                    for (var i = 0; i < newObj.length; i++)
                        acc.push(newObj[i]);
                } else if (Array.isArray(currObjNames)) {
                    for (var i = 0; i < currObjNames.length; i++)
                        retrieveObjectNamesAcc(currObjNames[i], acc);
                }
            }





            /**
             * Retrieve coordinate system from the loaded scene
             */
            function getCoordSystem() {
                var scene = appInstance.scene;

                if (scene && "v3d" in scene.userData && "coordSystem" in scene.userData.v3d) {
                    return scene.userData.v3d.coordSystem;
                } else {
                    // COMPAT: <2.17, consider replacing to 'Y_UP_RIGHT' for scenes with unknown origin
                    return 'Z_UP_RIGHT';
                }
            }


            /**
             * Transform coordinates from one space to another
             * Can be used with Vector3 or Euler.
             */
            function coordsTransform(coords, from, to, noSignChange) {

                if (from == to)
                    return coords;

                var y = coords.y,
                    z = coords.z;

                if (from == 'Z_UP_RIGHT' && to == 'Y_UP_RIGHT') {
                    coords.y = z;
                    coords.z = noSignChange ? y : -y;
                } else if (from == 'Y_UP_RIGHT' && to == 'Z_UP_RIGHT') {
                    coords.y = noSignChange ? z : -z;
                    coords.z = y;
                } else {
                    console.error('coordsTransform: Unsupported coordinate space');
                }

                return coords;
            }


            /**
             * Verge3D euler rotation to Blender/Max shortest.
             * 1) Convert from intrinsic rotation (v3d) to extrinsic XYZ (Blender/Max default
             *    order) via reversion: XYZ -> ZYX
             * 2) swizzle ZYX->YZX
             * 3) choose the shortest rotation to resemble Blender's behavior
             */
            var eulerV3DToBlenderShortest = function() {

                var eulerTmp = new v3d.Euler();
                var eulerTmp2 = new v3d.Euler();
                var vec3Tmp = new v3d.Vector3();

                return function(euler, dest) {

                    var eulerBlender = eulerTmp.copy(euler).reorder('YZX');
                    var eulerBlenderAlt = eulerTmp2.copy(eulerBlender).makeAlternative();

                    var len = eulerBlender.toVector3(vec3Tmp).lengthSq();
                    var lenAlt = eulerBlenderAlt.toVector3(vec3Tmp).lengthSq();

                    dest.copy(len < lenAlt ? eulerBlender : eulerBlenderAlt);
                    return coordsTransform(dest, 'Y_UP_RIGHT', 'Z_UP_RIGHT');
                }

            }();




            function RotationInterface() {
                /**
                 * For user manipulations use XYZ extrinsic rotations (which
                 * are the same as ZYX intrinsic rotations)
                 *     - Blender/Max/Maya use extrinsic rotations in the UI
                 *     - XYZ is the default option, but could be set from
                 *       some order hint if exported
                 */
                this._userRotation = new v3d.Euler(0, 0, 0, 'ZYX');
                this._actualRotation = new v3d.Euler();
            }

            Object.assign(RotationInterface, {
                initObject: function(obj) {
                    if (obj.userData.v3d.puzzles === undefined) {
                        obj.userData.v3d.puzzles = {}
                    }
                    if (obj.userData.v3d.puzzles.rotationInterface === undefined) {
                        obj.userData.v3d.puzzles.rotationInterface = new RotationInterface();
                    }

                    var rotUI = obj.userData.v3d.puzzles.rotationInterface;
                    rotUI.updateFromObject(obj);
                    return rotUI;
                }
            });

            Object.assign(RotationInterface.prototype, {

                updateFromObject: function(obj) {
                    var SYNC_ROT_EPS = 1e-8;

                    if (!this._actualRotation.equalsEps(obj.rotation, SYNC_ROT_EPS)) {
                        this._actualRotation.copy(obj.rotation);
                        this._updateUserRotFromActualRot();
                    }
                },

                getActualRotation: function(euler) {
                    return euler.copy(this._actualRotation);
                },

                setUserRotation: function(euler) {
                    // don't copy the order, since it's fixed to ZYX for now
                    this._userRotation.set(euler.x, euler.y, euler.z);
                    this._updateActualRotFromUserRot();
                },

                getUserRotation: function(euler) {
                    return euler.copy(this._userRotation);
                },

                _updateUserRotFromActualRot: function() {
                    var order = this._userRotation.order;
                    this._userRotation.copy(this._actualRotation).reorder(order);
                },

                _updateActualRotFromUserRot: function() {
                    var order = this._actualRotation.order;
                    this._actualRotation.copy(this._userRotation).reorder(order);
                }

            });




            // setObjTransform puzzle
            function setObjTransform(objSelector, isWorldSpace, mode, vector, offset) {
                var x = vector[0];
                var y = vector[1];
                var z = vector[2];

                var objNames = retrieveObjectNames(objSelector);

                function setObjProp(obj, prop, val) {
                    if (!offset) {
                        obj[mode][prop] = val;
                    } else {
                        if (mode != "scale")
                            obj[mode][prop] += val;
                        else
                            obj[mode][prop] *= val;
                    }
                }

                var inputsUsed = _pGlob.vec3Tmp.set(Number(x !== ''), Number(y !== ''),
                    Number(z !== ''));
                var coords = _pGlob.vec3Tmp2.set(x || 0, y || 0, z || 0);

                if (mode === 'rotation') {
                    // rotations are specified in degrees
                    coords.multiplyScalar(v3d.MathUtils.DEG2RAD);
                }

                var coordSystem = getCoordSystem();

                coordsTransform(inputsUsed, coordSystem, 'Y_UP_RIGHT', true);
                coordsTransform(coords, coordSystem, 'Y_UP_RIGHT', mode === 'scale');

                for (var i = 0; i < objNames.length; i++) {

                    var objName = objNames[i];
                    if (!objName) continue;

                    var obj = getObjectByName(objName);
                    if (!obj) continue;

                    if (isWorldSpace && obj.parent) {
                        obj.matrixWorld.decomposeE(obj.position, obj.rotation, obj.scale);

                        if (inputsUsed.x) setObjProp(obj, "x", coords.x);
                        if (inputsUsed.y) setObjProp(obj, "y", coords.y);
                        if (inputsUsed.z) setObjProp(obj, "z", coords.z);

                        obj.matrixWorld.composeE(obj.position, obj.rotation, obj.scale);
                        obj.matrix.multiplyMatrices(_pGlob.mat4Tmp.copy(obj.parent.matrixWorld).invert(), obj.matrixWorld);
                        obj.matrix.decompose(obj.position, obj.quaternion, obj.scale);

                    } else if (mode === 'rotation' && coordSystem == 'Z_UP_RIGHT') {
                        // Blender/Max coordinates

                        // need all the rotations for order conversions, especially if some
                        // inputs are not specified
                        var euler = eulerV3DToBlenderShortest(obj.rotation, _pGlob.eulerTmp);
                        coordsTransform(euler, coordSystem, 'Y_UP_RIGHT');

                        if (inputsUsed.x) euler.x = offset ? euler.x + coords.x : coords.x;
                        if (inputsUsed.y) euler.y = offset ? euler.y + coords.y : coords.y;
                        if (inputsUsed.z) euler.z = offset ? euler.z + coords.z : coords.z;

                        /**
                         * convert from Blender/Max default XYZ extrinsic order to v3d XYZ
                         * intrinsic with reversion (XYZ -> ZYX) and axes swizzling (ZYX -> YZX)
                         */
                        euler.order = "YZX";
                        euler.reorder(obj.rotation.order);
                        obj.rotation.copy(euler);

                    } else if (mode === 'rotation' && coordSystem == 'Y_UP_RIGHT') {
                        // Maya coordinates

                        // Use separate rotation interface to fix ambiguous rotations for Maya,
                        // might as well do the same for Blender/Max.

                        var rotUI = RotationInterface.initObject(obj);
                        var euler = rotUI.getUserRotation(_pGlob.eulerTmp);
                        // TODO(ivan): this probably needs some reasonable wrapping
                        if (inputsUsed.x) euler.x = offset ? euler.x + coords.x : coords.x;
                        if (inputsUsed.y) euler.y = offset ? euler.y + coords.y : coords.y;
                        if (inputsUsed.z) euler.z = offset ? euler.z + coords.z : coords.z;

                        rotUI.setUserRotation(euler);
                        rotUI.getActualRotation(obj.rotation);
                    } else {
                        if (inputsUsed.x) setObjProp(obj, "x", coords.x);
                        if (inputsUsed.y) setObjProp(obj, "y", coords.y);
                        if (inputsUsed.z) setObjProp(obj, "z", coords.z);

                    }

                    obj.updateMatrixWorld(true);
                }

            }



            // css3d controls puzzle
            function css3dControls(option) {
                if (!_pGlob.css3d.renderer) {
                    return
                }
                switch (option) {
                    case 'OPTION_ENABLE':
                        css3dControlsEnabled(true);
                        break;
                    case 'OPTION_DISABLE':
                        css3dControlsEnabled(false);
                        break;
                }

                function css3dControlsEnabled(flag) {
                    if (flag) {
                        appInstance.container.style.pointerEvents = "none";
                        _pGlob.css3d.renderer.domElement.style.pointerEvents = "auto";
                    } else {
                        appInstance.container.style.pointerEvents = "auto";
                        _pGlob.css3d.renderer.domElement.style.pointerEvents = "none";
                    }
                }
            }



            // css3dOnHoverEvent puzzle
            function css3dOnHoverEvent(objSelector, cbOver, cbOut) {
                const css3d = getCss3dByName(objSelector);
                if (!css3d) return;

                const v3dContainer = appInstance.renderer.domElement;

                v3dContainer.addEventListener('mousemove', v3dListener);
                v3dContainer.addEventListener('touchstart', v3dListener);

                css3d.element.addEventListener('mouseleave', function(event) {
                    event.preventDefault();
                    cbOut();
                });

                _pGlob.css3d.renderer.domElement.addEventListener('touchstart', function(event) {
                    event.preventDefault();
                    if (event.target.id == 'css3d-container') {
                        cbOut();
                    }
                });


                function v3dListener(event) {

                    // to handle unload in loadScene puzzle
                    if (!appInstance.getCamera())
                        return;

                    event.preventDefault();

                    let xNorm = 0,
                        yNorm = 0;
                    if (event instanceof MouseEvent) {
                        //if (mouseButtons && mouseButtons.indexOf(event.button) == -1)
                        //    return;
                        xNorm = event.offsetX / v3dContainer.clientWidth;
                        yNorm = event.offsetY / v3dContainer.clientHeight;
                    } else if (event instanceof TouchEvent) {
                        const rect = v3dContainer.getBoundingClientRect();
                        xNorm = (event.changedTouches[0].clientX - rect.left) / rect.width;
                        yNorm = (event.changedTouches[0].clientY - rect.top) / rect.height;
                    }

                    _pGlob.screenCoords.x = xNorm * 2 - 1;
                    _pGlob.screenCoords.y = -yNorm * 2 + 1;
                    _pGlob.css3d.raycaster.setFromCamera(_pGlob.screenCoords, appInstance.getCamera(true));
                    let objList = [];
                    appInstance.scene.traverse(function(obj) { objList.push(obj); });
                    const intersects = _pGlob.css3d.raycaster.intersectObjects(objList);
                    if (intersects.length && intersects[0].object.name == objSelector) {
                        cbOver();
                    }


                }
            }










            //getNowLoaded
            function getNowLoaded() {
                let percentageForloading = 'completed'
                return percentageForloading
            }

            // getUrlData puzzle
            function getUrlData(kind, isParent) {

                var targetWindow = isParent ? window.parent : window;
                switch (kind) {
                    case 'URL':
                        return targetWindow.location.href;
                    case 'PARAMS':
                        return v3d.AppUtils.getPageParams(targetWindow);
                    case 'HOSTNAME':
                        return targetWindow.location.hostname;
                    default:
                        console.error('getUrlData: option does not exists.');
                        return '';
                }

            }



            // dictGet puzzle
            function dictGet(dict, key) {
                if (dict && typeof dict == 'object')
                    return dict[key];
            }



            // featureAvailable puzzle
            function featureAvailable(feature) {

                var userAgent = window.navigator.userAgent;
                var platform = window.navigator.platform;

                switch (feature) {
                    case 'LINUX':
                        return /Linux/.test(platform);
                    case 'WINDOWS':
                        return ['Win32', 'Win64', 'Windows', 'WinCE'].indexOf(platform) !== -1;
                    case 'MACOS':
                        return (['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].indexOf(platform) !== -1 && !v3d.Detector.checkIOS());
                    case 'IOS':
                        return v3d.Detector.checkIOS();
                    case 'ANDROID':
                        return /Android/i.test(userAgent);
                    case 'MOBILE':
                        return (/Android|webOS|BlackBerry/i.test(userAgent) || v3d.Detector.checkIOS());

                    case 'CHROME':
                        // Chromium based
                        return (!!window.chrome && !/Edge/.test(navigator.userAgent));
                    case 'FIREFOX':
                        return /Firefox/.test(navigator.userAgent);
                    case 'IE':
                        return /Trident/.test(navigator.userAgent);
                    case 'EDGE':
                        return /Edge/.test(navigator.userAgent);
                    case 'SAFARI':
                        return (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));

                    case 'TOUCH':
                        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
                    case 'RETINA':
                        return window.devicePixelRatio >= 2;
                    case 'HDR':
                        return appInstance.useHDR;
                    case 'WEBAUDIO':
                        return v3d.Detector.checkWebAudio();
                    case 'WEBGL2':
                        var canvas = document.createElement('canvas');
                        var gl = canvas.getContext('webgl2')
                        return !!gl;
                    case 'WOOCOMMERCE':
                        var woo_fun = window.parent.v3d_woo_get_product_info || window.parent.parent.v3d_woo_get_product_info;
                        return !!woo_fun;
                    case 'DO_NOT_TRACK':
                        if (navigator.doNotTrack == '1' || window.doNotTrack == '1')
                            return true;
                        else
                            return false;
                    default:
                        return false;
                }

            }



            /**
             * Get a scene that contains the root of the given action.
             */
            function getSceneByAction(action) {
                var root = action.getRoot();
                var scene = root.type == "Scene" ? root : null;
                root.traverseAncestors(function(ancObj) {
                    if (ancObj.type == "Scene") {
                        scene = ancObj;
                    }
                });
                return scene;
            }



            /**
             * Get the current scene's framerate.
             */
            function getSceneAnimFrameRate(scene) {
                if (scene && "v3d" in scene.userData && "animFrameRate" in scene.userData.v3d) {
                    return scene.userData.v3d.animFrameRate;
                }
                return 24;
            }



            _pGlob.animMixerCallbacks = [];

            var initAnimationMixer = function() {

                function onMixerFinished(e) {
                    var cb = _pGlob.animMixerCallbacks;
                    var found = [];
                    for (var i = 0; i < cb.length; i++) {
                        if (cb[i][0] == e.action) {
                            cb[i][0] = null; // desactivate
                            found.push(cb[i][1]);
                        }
                    }
                    for (var i = 0; i < found.length; i++) {
                        found[i]();
                    }
                }

                return function initAnimationMixer() {
                    if (appInstance.mixer && !appInstance.mixer.hasEventListener('finished', onMixerFinished))
                        appInstance.mixer.addEventListener('finished', onMixerFinished);
                };

            }();



            // animation puzzles
            function operateAnimation(operation, animations, from, to, loop, speed, callback, isPlayAnimCompat, rev) {
                if (!animations)
                    return;
                // input can be either single obj or array of objects
                if (typeof animations == "string")
                    animations = [animations];

                function processAnimation(animName) {
                    var action = v3d.SceneUtils.getAnimationActionByName(appInstance, animName);
                    if (!action)
                        return;
                    switch (operation) {
                        case 'PLAY':
                            if (!action.isRunning()) {
                                action.reset();
                                if (loop && (loop != "AUTO"))
                                    action.loop = v3d[loop];
                                var scene = getSceneByAction(action);
                                var frameRate = getSceneAnimFrameRate(scene);

                                // compatibility reasons: deprecated playAnimation puzzles don't
                                // change repetitions
                                if (!isPlayAnimCompat) {
                                    action.repetitions = Infinity;
                                }

                                var timeScale = Math.abs(parseFloat(speed));
                                if (rev)
                                    timeScale *= -1;

                                action.timeScale = timeScale;
                                action.timeStart = from !== null ? from / frameRate : 0;
                                if (to !== null) {
                                    action.getClip().duration = to / frameRate;
                                } else {
                                    action.getClip().resetDuration();
                                }
                                action.time = timeScale >= 0 ? action.timeStart : action.getClip().duration;

                                action.paused = false;
                                action.play();

                                // push unique callbacks only
                                var callbacks = _pGlob.animMixerCallbacks;
                                var found = false;

                                for (var j = 0; j < callbacks.length; j++)
                                    if (callbacks[j][0] == action && callbacks[j][1] == callback)
                                        found = true;

                                if (!found)
                                    _pGlob.animMixerCallbacks.push([action, callback]);
                            }
                            break;
                        case 'STOP':
                            action.stop();

                            // remove callbacks
                            var callbacks = _pGlob.animMixerCallbacks;
                            for (var j = 0; j < callbacks.length; j++)
                                if (callbacks[j][0] == action) {
                                    callbacks.splice(j, 1);
                                    j--
                                }

                            break;
                        case 'PAUSE':
                            action.paused = true;
                            break;
                        case 'RESUME':
                            action.paused = false;
                            break;
                        case 'SET_FRAME':
                            var scene = getSceneByAction(action);
                            var frameRate = getSceneAnimFrameRate(scene);
                            action.time = from ? from / frameRate : 0;
                            action.play();
                            action.paused = true;
                            break;
                    }
                }

                for (var i = 0; i < animations.length; i++) {
                    var animName = animations[i];
                    if (animName)
                        processAnimation(animName);
                }

                initAnimationMixer();
            }
            // dictSet puzzle
            function dictSet(dict, key, value) {
                if (dict && typeof dict == 'object')
                    dict[key] = value;
            }


            // getGPU puzzle
            function getGPU(feature) {

                switch (feature) {
                    case 'VENDOR':
                        return v3d.Detector.getGPUVendor(appInstance.renderer);
                    case 'MODEL':
                        return v3d.Detector.getGPUModel(appInstance.renderer);
                }
            }



            function getDateTime(type, isGMT) {

                var date = new Date();

                function doubleDigits(num) {
                    return (num <= 9 ? "0" + num : "" + num);
                }

                switch (type) {
                    case 'FULL':
                        return isGMT ? date.toUTCString() : date.toString();
                    case 'TIME':
                        if (isGMT)
                            return doubleDigits(date.getUTCHours()) + ':' +
                                doubleDigits(date.getUTCMinutes()) + ':' +
                                doubleDigits(date.getUTCSeconds());
                        else
                            return doubleDigits(date.getHours()) + ':' +
                                doubleDigits(date.getMinutes()) + ':' +
                                doubleDigits(date.getSeconds());
                    case 'YEAR':
                        return isGMT ? date.getUTCFullYear() : date.getFullYear();
                    case 'MONTH':
                        return isGMT ? date.getUTCMonth() + 1 : date.getMonth() + 1;
                    case 'DAY':
                        return isGMT ? date.getUTCDate() : date.getDate();
                    case 'WEEK_DAY':
                        return isGMT ? date.getUTCDay() + 1 : date.getDay() + 1;
                    case 'HOURS':
                        return isGMT ? date.getUTCHours() : date.getHours();
                    case 'MINUTES':
                        return isGMT ? date.getUTCMinutes() : date.getMinutes();
                    case 'SECONDS':
                        return isGMT ? date.getUTCSeconds() : date.getSeconds();
                    case 'MILLISECONDS':
                        return isGMT ? date.getUTCMilliseconds() : date.getMilliseconds();
                    case 'TIMEZONE':
                        return isGMT ? 0 : -date.getTimezoneOffset() / 60;
                }
            }

            // utility functions envoked by the HTML puzzles
            function getElements(ids, isParent) {
                var elems = [];
                if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
                    ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
                    for (var i = 0; i < ids.length; i++)
                        elems.push(getElement(ids[i], isParent));
                } else {
                    elems.push(getElement(ids, isParent));
                }
                return elems;
            }

            function getElement(id, isParent) {
                var elem;
                if (Array.isArray(id) && id[0] == 'CONTAINER') {
                    if (appInstance !== null) {
                        elem = appInstance.container;
                    } else if (typeof _initGlob !== 'undefined') {
                        // if we are on the initialization stage, we still can have access
                        // to the container element
                        var id = _initGlob.container;
                        if (isParent) {
                            elem = parent.document.getElementById(id);
                        } else {
                            elem = document.getElementById(id);
                        }
                    }
                } else if (Array.isArray(id) && id[0] == 'WINDOW') {
                    if (isParent)
                        elem = parent;
                    else
                        elem = window;
                } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
                    if (isParent)
                        elem = parent.document;
                    else
                        elem = document;
                } else if (Array.isArray(id) && id[0] == 'BODY') {
                    if (isParent)
                        elem = parent.document.body;
                    else
                        elem = document.body;
                } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
                    if (isParent)
                        elem = parent.document.querySelector(id);
                    else
                        elem = document.querySelector(id);
                } else {
                    if (isParent)
                        elem = parent.document.getElementById(id);
                    else
                        elem = document.getElementById(id);
                }
                return elem;
            }

            // getHTMLElemAttribute puzzle
            function getHTMLElemAttribute(attr, id, isParent) {
                var elem = getElement(id, isParent);
                return elem ? elem[attr] : '';
            }



            // callJSFunction puzzle
            function getJSFunction(funcName) {
                var jsFunc = appInstance.ExternalInterface[funcName];
                if (typeof jsFunc == "function")
                    return jsFunc;
                else
                    return function() {};
            }
            // setTimeout puzzle
            function registerSetTimeout(timeout, callback) {
                window.setTimeout(callback, 1000 * timeout);
            }


            // Describe this function...
            function myProcedures(cip, cname) {
                registerSetTimeout(0.5, function() {
                    dictSet(DeviceInformation, 'cip', cip);
                    dictSet(DeviceInformation, 'cname', cname);
                });
            }



            //jk2







            // Describe this function...
            function firstIntoPic(resivenow) {
                this_URL = window.urls;
                console.log(this_URL);
                Data_shouldbeshow = resivenow;
                console.log('datashouldbeshow', Data_shouldbeshow);
                if ((typeof Data_shouldbeshow == 'object' ? Object.keys(Data_shouldbeshow) : []).length != 0) {
                    var j_end = (typeof Data_shouldbeshow == 'object' ? Object.keys(Data_shouldbeshow) : []).length;
                    var j_inc = 1;
                    if (1 > j_end) {
                        j_inc = -j_inc;
                    }
                    for (j = 1; j_inc >= 0 ? j <= j_end : j >= j_end; j += j_inc) {
                        showedMake(j);
                    }
                    preFaction();
                }
            }
            // Describe this function...
            function getNowproduct() {
                return lookItem;
            }


            // utility function envoked by almost all V3D-specific puzzles
            // filter off some non-mesh types
            function notIgnoredObj(obj) {
                return obj.type !== 'AmbientLight' &&
                    obj.name !== '' &&
                    !(obj.isMesh && obj.isMaterialGeneratedMesh) &&
                    !obj.isAuxClippingMesh;
            }


            // utility function envoked by almost all V3D-specific puzzles
            // find first occurence of the object by its name
            function getObjectByName(objName) {
                var objFound;
                var runTime = _pGlob !== undefined;
                objFound = runTime ? _pGlob.objCache[objName] : null;

                if (objFound && objFound.name === objName)
                    return objFound;

                appInstance.scene.traverse(function(obj) {
                    if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
                        objFound = obj;
                        if (runTime) {
                            _pGlob.objCache[objName] = objFound;
                        }
                    }
                });
                return objFound;
            }


            // utility function envoked by almost all V3D-specific puzzles
            // retrieve all objects on the scene
            function getAllObjectNames() {
                var objNameList = [];
                appInstance.scene.traverse(function(obj) {
                    if (notIgnoredObj(obj))
                        objNameList.push(obj.name)
                });
                return objNameList;
            }


            // utility function envoked by almost all V3D-specific puzzles
            // retrieve all objects which belong to the group
            function getObjectNamesByGroupName(targetGroupName) {
                var objNameList = [];
                appInstance.scene.traverse(function(obj) {
                    if (notIgnoredObj(obj)) {
                        var groupNames = obj.groupNames;
                        if (!groupNames)
                            return;
                        for (var i = 0; i < groupNames.length; i++) {
                            var groupName = groupNames[i];
                            if (groupName == targetGroupName) {
                                objNameList.push(obj.name);
                            }
                        }
                    }
                });
                return objNameList;
            }


            // utility function envoked by almost all V3D-specific puzzles
            // process object input, which can be either single obj or array of objects, or a group
            function retrieveObjectNames(objNames) {
                var acc = [];
                retrieveObjectNamesAcc(objNames, acc);
                return acc.filter(function(name) {
                    return name;
                });
            }

            function retrieveObjectNamesAcc(currObjNames, acc) {
                if (typeof currObjNames == "string") {
                    acc.push(currObjNames);
                } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
                    var newObj = getObjectNamesByGroupName(currObjNames[1]);
                    for (var i = 0; i < newObj.length; i++)
                        acc.push(newObj[i]);
                } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
                    var newObj = getAllObjectNames();
                    for (var i = 0; i < newObj.length; i++)
                        acc.push(newObj[i]);
                } else if (Array.isArray(currObjNames)) {
                    for (var i = 0; i < currObjNames.length; i++)
                        retrieveObjectNamesAcc(currObjNames[i], acc);
                }
            }



            // show and hide puzzles
            function changeVis(objSelector, bool) {
                var objNames = retrieveObjectNames(objSelector);

                for (var i = 0; i < objNames.length; i++) {
                    var objName = objNames[i]
                    if (!objName)
                        continue;
                    var obj = getObjectByName(objName);
                    if (!obj)
                        continue;
                    obj.visible = bool;
                }
            }

            /**
             * Retreive standard accessible textures for MeshNodeMaterial or MeshStandardMaterial.
             * If "collectSameNameMats" is true then all materials in the scene with the given name will
             * be used for collecting textures, otherwise will be used only the first found material (default behavior).
             */
            function matGetEditableTextures(matName, collectSameNameMats) {

                var mats = [];
                if (collectSameNameMats) {
                    mats = v3d.SceneUtils.getMaterialsByName(appInstance, matName);
                } else {
                    var firstMat = v3d.SceneUtils.getMaterialByName(appInstance, matName);
                    if (firstMat !== null) {
                        mats = [firstMat];
                    }
                }

                var textures = mats.reduce(function(texArray, mat) {
                    var matTextures = [];
                    switch (mat.type) {
                        case 'MeshNodeMaterial':
                            matTextures = Object.values(mat.nodeTextures);
                            break;

                        case 'MeshStandardMaterial':
                            matTextures = [
                                mat.map, mat.lightMap, mat.aoMap, mat.emissiveMap,
                                mat.bumpMap, mat.normalMap, mat.displacementMap,
                                mat.roughnessMap, mat.metalnessMap, mat.alphaMap, mat.envMap
                            ]
                            break;

                        default:
                            console.error('matGetEditableTextures: Unknown material type ' + mat.type);
                            break;
                    }

                    Array.prototype.push.apply(texArray, matTextures);
                    return texArray;
                }, []);

                return textures.filter(function(elem) {
                    // check Texture type exactly
                    return elem && (elem.constructor == v3d.Texture ||
                        elem.constructor == v3d.DataTexture ||
                        elem.constructor == v3d.VideoTexture);
                });
            }



            // getTextureParam puzzle
            function getTextureParam(matName, texName, what) {

                var textures = matGetEditableTextures(matName).filter(function(elem) {
                    return elem.name == texName;
                });


                var validTex = textures.length && textures[0].image ? textures[0] : null;

                var widthProp = validTex instanceof v3d.VideoTexture ? 'videoWidth' : 'width';
                var heightProp = validTex instanceof v3d.VideoTexture ? 'videoHeight' : 'height';

                switch (what) {
                    case 'WIDTH':
                        if (!validTex || !validTex.image[widthProp]) return 0;
                        return validTex.image[widthProp];
                        break;
                    case 'HEIGHT':
                        if (!validTex || !validTex.image[heightProp]) return 0;
                        return validTex.image[heightProp];
                        break;
                    case 'ASPECT':
                        if (!validTex || !validTex.image[widthProp] || !validTex.image[heightProp]) return 0;
                        return validTex.image[widthProp] / validTex.image[heightProp];
                        break;
                    case 'WIDTH_HEIGHT':
                        if (!validTex || !validTex.image[widthProp] || !validTex.image[heightProp]) return [0, 0];
                        return [validTex.image[widthProp], validTex.image[heightProp]];
                        break;
                }
            }

            /**
             * Retrieve coordinate system from the loaded scene
             */
            function getCoordSystem() {
                var scene = appInstance.scene;

                if (scene && "v3d" in scene.userData && "coordSystem" in scene.userData.v3d) {
                    return scene.userData.v3d.coordSystem;
                } else {
                    // COMPAT: <2.17, consider replacing to 'Y_UP_RIGHT' for scenes with unknown origin
                    return 'Z_UP_RIGHT';
                }
            }


            /**
             * Transform coordinates from one space to another
             * Can be used with Vector3 or Euler.
             */
            function coordsTransform(coords, from, to, noSignChange) {

                if (from == to)
                    return coords;

                var y = coords.y,
                    z = coords.z;

                if (from == 'Z_UP_RIGHT' && to == 'Y_UP_RIGHT') {
                    coords.y = z;
                    coords.z = noSignChange ? y : -y;
                } else if (from == 'Y_UP_RIGHT' && to == 'Z_UP_RIGHT') {
                    coords.y = noSignChange ? z : -z;
                    coords.z = y;
                } else {
                    console.error('coordsTransform: Unsupported coordinate space');
                }

                return coords;
            }


            /**
             * Verge3D euler rotation to Blender/Max shortest.
             * 1) Convert from intrinsic rotation (v3d) to extrinsic XYZ (Blender/Max default
             *    order) via reversion: XYZ -> ZYX
             * 2) swizzle ZYX->YZX
             * 3) choose the shortest rotation to resemble Blender's behavior
             */
            var eulerV3DToBlenderShortest = function() {

                var eulerTmp = new v3d.Euler();
                var eulerTmp2 = new v3d.Euler();
                var vec3Tmp = new v3d.Vector3();

                return function(euler, dest) {

                    var eulerBlender = eulerTmp.copy(euler).reorder('YZX');
                    var eulerBlenderAlt = eulerTmp2.copy(eulerBlender).makeAlternative();

                    var len = eulerBlender.toVector3(vec3Tmp).lengthSq();
                    var lenAlt = eulerBlenderAlt.toVector3(vec3Tmp).lengthSq();

                    dest.copy(len < lenAlt ? eulerBlender : eulerBlenderAlt);
                    return coordsTransform(dest, 'Y_UP_RIGHT', 'Z_UP_RIGHT');
                }

            }();




            function RotationInterface() {
                /**
                 * For user manipulations use XYZ extrinsic rotations (which
                 * are the same as ZYX intrinsic rotations)
                 *     - Blender/Max/Maya use extrinsic rotations in the UI
                 *     - XYZ is the default option, but could be set from
                 *       some order hint if exported
                 */
                this._userRotation = new v3d.Euler(0, 0, 0, 'ZYX');
                this._actualRotation = new v3d.Euler();
            }

            Object.assign(RotationInterface, {
                initObject: function(obj) {
                    if (obj.userData.v3d.puzzles === undefined) {
                        obj.userData.v3d.puzzles = {}
                    }
                    if (obj.userData.v3d.puzzles.rotationInterface === undefined) {
                        obj.userData.v3d.puzzles.rotationInterface = new RotationInterface();
                    }

                    var rotUI = obj.userData.v3d.puzzles.rotationInterface;
                    rotUI.updateFromObject(obj);
                    return rotUI;
                }
            });

            Object.assign(RotationInterface.prototype, {

                updateFromObject: function(obj) {
                    var SYNC_ROT_EPS = 1e-8;

                    if (!this._actualRotation.equalsEps(obj.rotation, SYNC_ROT_EPS)) {
                        this._actualRotation.copy(obj.rotation);
                        this._updateUserRotFromActualRot();
                    }
                },

                getActualRotation: function(euler) {
                    return euler.copy(this._actualRotation);
                },

                setUserRotation: function(euler) {
                    // don't copy the order, since it's fixed to ZYX for now
                    this._userRotation.set(euler.x, euler.y, euler.z);
                    this._updateActualRotFromUserRot();
                },

                getUserRotation: function(euler) {
                    return euler.copy(this._userRotation);
                },

                _updateUserRotFromActualRot: function() {
                    var order = this._userRotation.order;
                    this._userRotation.copy(this._actualRotation).reorder(order);
                },

                _updateActualRotFromUserRot: function() {
                    var order = this._actualRotation.order;
                    this._actualRotation.copy(this._userRotation).reorder(order);
                }

            });




            // setObjTransform puzzle
            function setObjTransform(objSelector, isWorldSpace, mode, vector, offset) {
                var x = vector[0];
                var y = vector[1];
                var z = vector[2];

                var objNames = retrieveObjectNames(objSelector);

                function setObjProp(obj, prop, val) {
                    if (!offset) {
                        obj[mode][prop] = val;
                    } else {
                        if (mode != "scale")
                            obj[mode][prop] += val;
                        else
                            obj[mode][prop] *= val;
                    }
                }

                var inputsUsed = _pGlob.vec3Tmp.set(Number(x !== ''), Number(y !== ''),
                    Number(z !== ''));
                var coords = _pGlob.vec3Tmp2.set(x || 0, y || 0, z || 0);

                if (mode === 'rotation') {
                    // rotations are specified in degrees
                    coords.multiplyScalar(v3d.MathUtils.DEG2RAD);
                }

                var coordSystem = getCoordSystem();

                coordsTransform(inputsUsed, coordSystem, 'Y_UP_RIGHT', true);
                coordsTransform(coords, coordSystem, 'Y_UP_RIGHT', mode === 'scale');

                for (var i = 0; i < objNames.length; i++) {

                    var objName = objNames[i];
                    if (!objName) continue;

                    var obj = getObjectByName(objName);
                    if (!obj) continue;

                    if (isWorldSpace && obj.parent) {
                        obj.matrixWorld.decomposeE(obj.position, obj.rotation, obj.scale);

                        if (inputsUsed.x) setObjProp(obj, "x", coords.x);
                        if (inputsUsed.y) setObjProp(obj, "y", coords.y);
                        if (inputsUsed.z) setObjProp(obj, "z", coords.z);

                        obj.matrixWorld.composeE(obj.position, obj.rotation, obj.scale);
                        obj.matrix.multiplyMatrices(_pGlob.mat4Tmp.copy(obj.parent.matrixWorld).invert(), obj.matrixWorld);
                        obj.matrix.decompose(obj.position, obj.quaternion, obj.scale);

                    } else if (mode === 'rotation' && coordSystem == 'Z_UP_RIGHT') {
                        // Blender/Max coordinates

                        // need all the rotations for order conversions, especially if some
                        // inputs are not specified
                        var euler = eulerV3DToBlenderShortest(obj.rotation, _pGlob.eulerTmp);
                        coordsTransform(euler, coordSystem, 'Y_UP_RIGHT');

                        if (inputsUsed.x) euler.x = offset ? euler.x + coords.x : coords.x;
                        if (inputsUsed.y) euler.y = offset ? euler.y + coords.y : coords.y;
                        if (inputsUsed.z) euler.z = offset ? euler.z + coords.z : coords.z;

                        /**
                         * convert from Blender/Max default XYZ extrinsic order to v3d XYZ
                         * intrinsic with reversion (XYZ -> ZYX) and axes swizzling (ZYX -> YZX)
                         */
                        euler.order = "YZX";
                        euler.reorder(obj.rotation.order);
                        obj.rotation.copy(euler);

                    } else if (mode === 'rotation' && coordSystem == 'Y_UP_RIGHT') {
                        // Maya coordinates

                        // Use separate rotation interface to fix ambiguous rotations for Maya,
                        // might as well do the same for Blender/Max.

                        var rotUI = RotationInterface.initObject(obj);
                        var euler = rotUI.getUserRotation(_pGlob.eulerTmp);
                        // TODO(ivan): this probably needs some reasonable wrapping
                        if (inputsUsed.x) euler.x = offset ? euler.x + coords.x : coords.x;
                        if (inputsUsed.y) euler.y = offset ? euler.y + coords.y : coords.y;
                        if (inputsUsed.z) euler.z = offset ? euler.z + coords.z : coords.z;

                        rotUI.setUserRotation(euler);
                        rotUI.getActualRotation(obj.rotation);
                    } else {
                        if (inputsUsed.x) setObjProp(obj, "x", coords.x);
                        if (inputsUsed.y) setObjProp(obj, "y", coords.y);
                        if (inputsUsed.z) setObjProp(obj, "z", coords.z);

                    }

                    obj.updateMatrixWorld(true);
                }

            }


            /**
             * Replace accessible textures for MeshNodeMaterial or MeshStandardMaterial
             */
            function matReplaceEditableTexture(mat, oldTex, newTex) {

                switch (mat.type) {
                    case 'MeshNodeMaterial':
                        for (var name in mat.nodeTextures) {
                            if (mat.nodeTextures[name] == oldTex) {
                                mat.nodeTextures[name] = newTex;
                            }
                        }

                        break;

                    case 'MeshStandardMaterial':

                        var texNames = ['map', 'lightMap', 'aoMap', 'emissiveMap',
                            'bumpMap', 'normalMap', 'displacementMap', 'roughnessMap',
                            'metalnessMap', 'alphaMap', 'envMap'
                        ];

                        texNames.forEach(function(name) {
                            if (mat[name] == oldTex) {
                                mat[name] = newTex;
                            }
                        });

                        break;

                    default:
                        console.error('matReplaceEditableTexture: Unsupported material type ' + mat.type);
                        break;
                }

                // inherit some save params
                newTex.encoding = oldTex.encoding;
                newTex.wrapS = oldTex.wrapS;
                newTex.wrapT = oldTex.wrapT;

            }



            // replaceTexture puzzle
            function replaceTexture(matName, texName, texUrlOrElem, doCb) {

                var textures = matGetEditableTextures(matName, true).filter(function(elem) {
                    return elem.name == texName;
                });



                if (!textures.length)
                    return;

                if (texUrlOrElem instanceof Promise) {

                    texUrlOrElem.then(function(response) {
                        processImageUrl(response);
                    }, function(error) {});

                } else if (typeof texUrlOrElem == 'string') {

                    processImageUrl(texUrlOrElem);

                    /**
                     * NOTE: not checking for the MediaHTML5 constructor, because otherwise this
                     * puzzle would always provide the code that's not needed most of the time
                     */
                } else if (texUrlOrElem instanceof Object && texUrlOrElem.source instanceof HTMLVideoElement) {

                    processVideo(texUrlOrElem.source);

                } else if (texUrlOrElem instanceof HTMLCanvasElement) {

                    processCanvas(texUrlOrElem);

                } else {

                    return;

                }

                function processImageUrl(url) {

                    var isHDR = (url.search(/\.hdr$/) > 0);

                    if (!isHDR) {
                        var loader = new v3d.ImageLoader();
                        loader.setCrossOrigin('Anonymous');
                    } else {
                        var loader = new v3d.FileLoader();
                        loader.setResponseType('arraybuffer');
                    }

                    loader.load(url, function(image) {
                        // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
                        var isJPEG = url.search(/\.(jpg|jpeg)$/) > 0 || url.search(/^data\:image\/jpeg/) === 0;

                        textures.forEach(function(elem) {

                            if (!isHDR) {
                                elem.image = image;
                            } else {
                                // parse loaded HDR buffer
                                var rgbeLoader = new v3d.RGBELoader();
                                var texData = rgbeLoader.parse(image);

                                // NOTE: reset params since the texture may be converted to float
                                elem.type = v3d.UnsignedByteType;
                                elem.encoding = v3d.RGBEEncoding;

                                elem.image = {
                                    data: texData.data,
                                    width: texData.width,
                                    height: texData.height
                                }

                                elem.magFilter = v3d.LinearFilter;
                                elem.minFilter = v3d.LinearFilter;
                                elem.generateMipmaps = false;
                                elem.isDataTexture = true;

                            }

                            elem.format = isJPEG ? v3d.RGBFormat : v3d.RGBAFormat;
                            elem.needsUpdate = true;

                            // update world material if it is using this texture
                            if (appInstance.scene !== null && appInstance.scene.worldMaterial !== null) {
                                var wMat = appInstance.scene.worldMaterial;
                                for (var texName in wMat.nodeTextures) {
                                    if (wMat.nodeTextures[texName] == elem) {
                                        appInstance.updateEnvironment(wMat);
                                    }
                                }
                            }
                        });

                        // exec once
                        doCb();

                    });
                }

                function processVideo(elem) {
                    var videoTex = new v3d.VideoTexture(elem);
                    videoTex.flipY = false;
                    videoTex.name = texName;

                    var videoAssigned = false;

                    var mats = v3d.SceneUtils.getMaterialsByName(appInstance, matName);
                    mats.forEach(function(mat) {

                        textures.forEach(function(tex) {
                            matReplaceEditableTexture(mat, tex, videoTex);
                        });

                        mat.needsUpdate = true;
                        videoAssigned = true;
                    });

                    if (videoAssigned)
                        doCb();

                }

                function processCanvas(elem) {
                    var canvasTex = new v3d.CanvasTexture(elem);
                    canvasTex.flipY = false;
                    canvasTex.name = texName;

                    var canvasAssigned = false;

                    var mats = v3d.SceneUtils.getMaterialsByName(appInstance, matName);
                    mats.forEach(function(mat) {

                        textures.forEach(function(tex) {
                            matReplaceEditableTexture(mat, tex, canvasTex);
                        });

                        mat.needsUpdate = true;
                        canvasAssigned = true;
                    });

                    if (canvasAssigned) {

                        if (v3d.PL) {
                            v3d.PL.canvasTextures = v3d.PL.canvasTextures || {};
                            v3d.PL.canvasTextures[canvasTex.image.id] = canvasTex;
                        }

                        doCb();
                    }

                }
            }


            //com:=>this function is use for create HTMLmodel
            //    export const HTMLMOD= class createHtml{
            //         modelname
            //         linkUrl
            //         modelWidth
            //         modelHeight
            //         constructor(modelname,linkUrl,modelHeight,modelWidth){
            //             this.modelname=modelname
            //             this.linkUrl=linkUrl
            //             this.modelHeight=modelHeight
            //             this.modelWidth=modelWidth
            //             modelEvent()
            //         }
            //         createModel(){
            //             createCss3dObject({
            //                 name: this.modelname,
            //                 iframe: `<iframe src='${this.linkUrl}'></iframe>`,
            //                 background: 'transparent',
            //                 width: this.modelWidth,
            //                 height: this.modelWidth,
            //                 scale: 0.01,
            //                 renderSide: 'RENDER_DOUBLE',
            //                 display: 'DISPLAY_MASK',
            //                 color: '',
            //             });
            //         }
            //         modelContral(mode,x,y,z){

            //             setObjTransform(this.modelname, false, mode, [x, y, z], false);

            //         }
            //         modelEvent(){
            //             css3dOnHoverEvent(this.modelname, function () {
            //                 css3dControls('OPTION_ENABLE');
            //             }, function () {
            //                 css3dControls('OPTION_DISABLE');
            //             });
            //         }
            //     }

            var screenObj = {
                screen1: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen2: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen3: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen4: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen5: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen6: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen7: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen8: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen9: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen10: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen11: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                },
                screen12: {
                    x: -15.815,
                    y: 12.644,
                    z: 0.3124
                }
            }

            let listentEvent = new Event('makeit', { bubbles: true, cancelable: true })
            document.querySelector('.v3d-canvas').dispatchEvent(listentEvent)
                // eventHTMLElem('well', ['QUERYSELECTOR', '.v3d-canvas'], true, function (event) { 
                // })
                //创建v3dcssmodel
            function createHTMLmodel(modelname, linkUrl, modelWidth, modelHeight, modelScale) {

                createCss3dObject({
                    name: modelname,
                    iframe: `<iframe src='${linkUrl}'></iframe>`,
                    background: 'transparent',
                    width: modelWidth,
                    height: modelHeight,
                    scale: modelScale,
                    renderSide: 'RENDER_DOUBLE',
                    display: 'DISPLAY_MASK',
                    color: '',
                });

                return modelCreate = modelname

            }

            css3dOnHoverEvent(modelCreate, function() {
                css3dControls('OPTION_ENABLE');
            }, function() {
                css3dControls('OPTION_DISABLE');
            });

            function contarlCreateModel(contarlmodel, x, y, z) {
                setObjTransform(modelCreate, false, contarlmodel, [x, y, z], false);

            }


            // Describe this function...
            function showedMake(i) {
                /* 进入场馆加载画画 */
                usershowedURL = window.urls;

                imgInstent = String(usershowedURL) + String(dictGet(dictGet(Data_shouldbeshow, 'Product_' + String(i)), 'preview'));
                videoPretake = String(usershowedURL) + String(dictGet(dictGet(Data_shouldbeshow, 'Product_' + String(i)), 'preview'));

                htmlInstent = String(usershowedURL) + String(dictGet(dictGet(Data_shouldbeshow, 'Product_' + String(i)), 'preview'));
                svgInstent = String(usershowedURL) + String(dictGet(dictGet(Data_shouldbeshow, 'Product_' + String(i)), 'url'));


                changeVis('Product_' + String(i), true);

                if (dictGet(dictGet(Data_shouldbeshow, 'Product_' + String(i)), 'motype') == 'video') {

                    let videoInstent = String(usershowedURL) + String(dictGet(dictGet(Data_shouldbeshow, 'Product_' + String(i)), 'url'));
                    replaceTexture('Product_' + String(i), 'Product_' + String(i), videoPretake, function() {

                        video_SizeAs = getTextureParam('Product_' + String(i), 'Product_' + String(i), 'ASPECT');
                        if (video_SizeAs <= 1) {
                            setObjTransform('Product_' + String(i), false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / video_SizeAs)], false);
                        } else {
                            setObjTransform('Product_' + String(i), false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / video_SizeAs)], false);
                        }
                        replaceTexture('Product_' + String(i), 'Product_' + String(i), loadVideo(videoInstent), function() {});
                    });



                } else if (dictGet(dictGet(Data_shouldbeshow, 'Product_' + String(i)), 'motype') == 'textrue') {
                    replaceTexture('Product_' + String(i), 'Product_' + String(i), imgInstent, function() {
                        pic_SizeAs = getTextureParam('Product_' + String(i), 'Product_' + String(i), 'ASPECT');
                        if (pic_SizeAs <= 1) {
                            setObjTransform('Product_' + String(i), false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / pic_SizeAs)], false);
                        } else {
                            setObjTransform('Product_' + String(i), false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / pic_SizeAs)], false);
                        }
                    });
                } else if (dictGet(dictGet(Data_shouldbeshow, 'Product_' + String(i)), 'motype') == 'html') {
                    replaceTexture('Product_' + String(i), 'Product_' + String(i), htmlInstent, function() {
                        pic_SizeAs = getTextureParam('Product_' + String(i), 'Product_' + String(i), 'ASPECT');
                        if (pic_SizeAs <= 1) {
                            setObjTransform('Product_' + String(i), false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / pic_SizeAs)], false);
                        } else {
                            setObjTransform('Product_' + String(i), false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / pic_SizeAs)], false);
                        }
                    });
                } else if (dictGet(dictGet(Data_shouldbeshow, 'Product_' + String(i)), 'motype') == 'svg') {
                    replaceTexture('Product_' + String(i), 'Product_' + String(i), svgInstent, function() {
                        pic_SizeAs = getTextureParam('Product_' + String(i), 'Product_' + String(i), 'ASPECT');
                        if (pic_SizeAs <= 1) {
                            setObjTransform('Product_' + String(i), false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / pic_SizeAs)], false);
                        } else {
                            setObjTransform('Product_' + String(i), false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / pic_SizeAs)], false);
                        }
                    });
                }
            }
            // setHTMLElemStyle puzzle
            function setHTMLElemStyle(prop, value, ids, isParent) {
                var elems = getElements(ids, isParent);
                for (var i = 0; i < elems.length; i++) {
                    var elem = elems[i];
                    if (!elem || !elem.style)
                        continue;
                    elem.style[prop] = value;
                }
            }

            // setHTMLElemStyle puzzle
            function setHTMLElemStyle(prop, value, ids, isParent) {
                var elems = getElements(ids, isParent);
                for (var i = 0; i < elems.length; i++) {
                    var elem = elems[i];
                    if (!elem || !elem.style)
                        continue;
                    elem.style[prop] = value;
                }
            }

            // Describe this function...
            function upTip(objectName, backDo) {

                registerOnClick(objectName, false, false, [0, 1, 2], function() {
                    console.log(objectName + "触发点击");
                    backDo();
                }, function() {});
            }

            // Describe this function...
            function replaceScreen(nodeName, materialName, textureURL) {

                replaceTexture(nodeName, materialName, textureURL,
                    function() {}, false);
            }

            // whenClicked puzzle
            function registerOnClick(objSelector, xRay, doubleClick, mouseButtons, cbDo, cbIfMissedDo) {

                // for AR/VR
                _pGlob.objClickInfo = _pGlob.objClickInfo || [];

                _pGlob.objClickInfo.push({
                    objSelector: objSelector,
                    callbacks: [cbDo, cbIfMissedDo]
                });

                initObjectPicking(function(intersects, event) {

                    var isPicked = false;

                    var maxIntersects = xRay ? intersects.length : Math.min(1, intersects.length);

                    for (var i = 0; i < maxIntersects; i++) {
                        var obj = intersects[i].object;
                        var objName = getPickedObjectName(obj);
                        var objNames = retrieveObjectNames(objSelector);

                        if (objectsIncludeObj(objNames, objName)) {
                            // save the object for the pickedObject block
                            _pGlob.pickedObject = objName;
                            isPicked = true;
                            cbDo(event);
                        }
                    }

                    if (!isPicked) {
                        _pGlob.pickedObject = '';
                        cbIfMissedDo(event);
                    }

                }, doubleClick ? 'dblclick' : 'mousedown', false, mouseButtons);
            }


            // Describe this function...
            function getNowshowed(nowSelected) {
                dame = nowSelected;
                console.log(dame);
                return dame;
            }
            // Describe this function...
            function closeMsgBox() {
                setHTMLElemStyle('display', 'none', ['QUERYSELECTOR', '.msgBoxInV3dApp'], false);
            }

            // Describe this function...
            function preFaction() {
                for (k = 1; k <= 22; k++) {
                    dictSet(model_Hstorylist, 'Product_' + String(k), ['firststate', 'motype', 'url', 'name', 'description']);
                    dictSet(talData, 'Product_' + String(k), {});
                }
                // if (model_Hstorylist!=null){
                //     console.log(model_Hstorylist);
                // }

            }

            // Describe this function...
            function savePack() {
                return talData;
            }


            function MediaHTML5(isVideo) {
                this.source = null;
            }

            Object.assign(MediaHTML5.prototype, {

                load: function(url, isVideo) {
                    if (isVideo) {
                        this.source = document.createElement('video');
                        this.source.playsInline = true;
                        this.source.preload = 'auto';
                        this.source.autoload = true;
                        this.source.crossOrigin = 'anonymous';
                    } else {
                        this.source = document.createElement('audio');
                    }

                    this.source.src = url;
                    return this;
                },

                play: function() {
                    this.source.play();
                },

                pause: function() {
                    this.source.pause();
                },

                stop: function() {
                    this.source.pause();
                    this.source.currentTime = 0;
                },

                rewind: function() {
                    this.source.currentTime = 0;
                },

                setPlaybackTime: function(time) {
                    this.source.currentTime = time
                },

                getPlaybackTime: function() {
                    return this.source.currentTime;
                },

                setPlaybackRate: function(rate) {
                    this.source.playbackRate = rate;
                },

                isPlaying: function() {
                    return this.source.duration > 0 && !this.source.paused;
                },

                setLoop: function(looped) {
                    this.source.loop = looped;
                },

                setVolume: function(volume) {
                    this.source.volume = volume;
                },

                setMuted: function(muted) {
                    this.source.muted = muted;
                },

            });



            // loadVideo puzzle
            function loadVideo(url) {
                var elems = _pGlob.mediaElements;
                if (!(url in elems)) {
                    elems[url] = new MediaHTML5().load(url, true);
                }
                return elems[url];
            }



            // stopSound puzzle
            function stopSound(mediaElem) {
                if (!mediaElem) {
                    return;
                }
                mediaElem.stop();
            }


            // // Describe this function...
            // function ChangeImg(selectObj, swpro_SizeAs, persionURL) {
            //     console.log('调用到了changeimg')
            //     console.log('isVideo:', isVideo)
            //     if (selectObj.motype == 'video' && selectObj.label == 'HECO' && selectObj.data[0].indexOf('.mp4') > -1) {
            //         isVideo = 'yes';
            //         console.log('执行了heco的video')
            //     } else if (selectObj.motype == 'video' && selectObj.label == 'opensea' && selectObj.type_animation == 'mp4') {
            //         isVideo = 'yes';
            //         console.log('执行了opense的video')
            //     } else {
            //         isVideo = 'no';
            //         console.log('不是video')
            //     }
            //     if (isVideo == 'yes') {
            //         playState = 0;
            //         stopSound(loadVideo(dictGet(dictGet(Data_shouldbeshow, lookItem), 'url')));
            //         switchProduct(selectObj, swpro_SizeAs, persionURL);
            //         console.log('change1')
            //     } else if (isVideo == 'no') {
            //         switchProduct(selectObj, swpro_SizeAs, persionURL);
            //         console.log('change2')
            //     }
            // }
            // Describe this function...
            function ChangeImg(selectObj, swpro_SizeAs) {
                /* 判断点击的对象并且作出更换前的处理 */
                if (isthisVideo != '' && isthisVideo == 'yes') {
                    playState = 0;
                    stopSound(loadVideo(dictGet(dictGet(Data_shouldbeshow, nowSelected), 'url')));
                    switchProduct(selectObj, swpro_SizeAs, window.urls);
                } else if (isthisVideo != '' && isthisVideo == 'no') {

                    switchProduct(selectObj, swpro_SizeAs, window.urls);
                } else if (isthisVideo == '') {

                }
            }
            // Describe this function...
            function closeAset() {
                setHTMLElemStyle('display', 'none', ['QUERYSELECTOR', '.imgchoose'], false);
            }
            // Describe this function...                    
            function switchProduct(selectObj, swpro_SizeAs, usingURL) {
                if (dictGet(selectObj, 'label') == 'HECO' || dictGet(selectObj, 'label') == 'notmint') {
                    if (dictGet(selectObj, 'motype') == 'textrue') {
                        changeSelect = String(usingURL) + String(dictGet(selectObj, 'data')[0]);
                        console.log('changeSelect heco texture:', changeSelect)
                        dictSet(dictGet(talData, nowSelected), 'motype', 'textrue');
                        dictSet(dictGet(talData, nowSelected), 'url', changeSelect);
                        dictSet(dictGet(talData, nowSelected), 'token_id', selectObj.token_id);
                        dictSet(dictGet(talData, nowSelected), 'label', selectObj.label);
                        // switchHistory[0] = changeSelect;
                        replaceTexture(nowSelected, nowSelected, changeSelect, function() {
                            if (swpro_SizeAs <= 1) {
                                setObjTransform(nowSelected, false, 'scale', [0.36 * 1.2 * 1.6, '', 0.36 * ((1.2 * 1.6) / swpro_SizeAs)], false);
                            } else {
                                setObjTransform(nowSelected, false, 'scale', [0.5 * 1.2 * 1.6, '', 0.5 * ((1.2 * 1.6) / swpro_SizeAs)], false);
                            }
                            dictSet(model_Hstorylist, nowSelected, [1, 'textrue', changeSelect, dictGet(selectObj, 'name'), dictGet(selectObj, 'creator'), dictGet(selectObj, 'description')]);

                        });
                    } else if (dictGet(selectObj, 'motype') == 'video') {
                        changeSelect = String(usingURL) + String(dictGet(selectObj, 'preview')[0]);
                        let nowVideo = String(usingURL) + String(dictGet(selectObj, 'data')[0]);
                        console.log('changeSelect heco video:', changeSelect)
                        dictSet(dictGet(talData, nowSelected), 'motype', 'video');
                        dictSet(dictGet(talData, nowSelected), 'url', String(usingURL) + String(dictGet(selectObj, 'data')[0]));
                        dictSet(dictGet(talData, nowSelected), 'token_id', selectObj.token_id)
                        dictSet(dictGet(talData, nowSelected), 'label', selectObj.label);
                        dictSet(dictGet(talData, nowSelected), 'preview', selectObj.preview[0]);
                        //switchHistory[0] = String(usingURL) + String(dictGet(selectObj, 'data')[0]);
                        replaceTexture(nowSelected, nowSelected, changeSelect, function() {
                            if (swpro_SizeAs <= 1) {
                                setObjTransform(nowSelected, false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                            } else {
                                setObjTransform(nowSelected, false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                            }
                            dictSet(model_Hstorylist, nowSelected, [1, 'video', nowVideo, dictGet(selectObj, 'name'), dictGet(selectObj, 'creator'), dictGet(selectObj, 'description')]);

                            replaceTexture(nowSelected, nowSelected, loadVideo(nowVideo), function() {});
                        });
                    } else if (dictGet(selectObj, 'motype') == 'svg') {
                        changeSelect = String(usingURL) + String(dictGet(selectObj, 'data')[0]);
                        console.log('changeSelect heco video:', changeSelect)
                        dictSet(dictGet(talData, nowSelected), 'motype', 'svg');
                        dictSet(dictGet(talData, nowSelected), 'url', String(usingURL) + String(dictGet(selectObj, 'data')[0]));
                        dictSet(dictGet(talData, nowSelected), 'token_id', selectObj.token_id)
                        dictSet(dictGet(talData, nowSelected), 'label', selectObj.label);
                        dictSet(dictGet(talData, nowSelected), 'preview', selectObj.preview[0]);
                        //switchHistory[0] = String(usingURL) + String(dictGet(selectObj, 'data')[0]);
                        replaceTexture(nowSelected, nowSelected, changeSelect, function() {
                            if (swpro_SizeAs <= 1) {
                                setObjTransform(nowSelected, false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                            } else {
                                setObjTransform(nowSelected, false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                            }
                            dictSet(model_Hstorylist, nowSelected, [1, 'svg', changeSelect, dictGet(selectObj, 'name'), dictGet(selectObj, 'creator'), dictGet(selectObj, 'description')]);

                        });
                    }
                    // 这里是我新增的
                } else if (dictGet(selectObj, 'label') == 'opensea') {
                    if (dictGet(selectObj, 'motype') == 'textrue') {
                        changeSelect = String(usingURL) + String(dictGet(selectObj, 'data_img')[0]);
                        dictSet(dictGet(talData, nowSelected), 'motype', 'textrue');
                        dictSet(dictGet(talData, nowSelected), 'url', changeSelect);
                        dictSet(dictGet(talData, nowSelected), 'token_id', selectObj.opensea_id)
                        dictSet(dictGet(talData, nowSelected), 'label', selectObj.label);

                        //switchHistory[0] = changeSelect;
                        replaceTexture(nowSelected, nowSelected, changeSelect, function() {
                            if (swpro_SizeAs <= 1) {
                                setObjTransform(nowSelected, false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                            } else {
                                setObjTransform(nowSelected, false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                            }
                            dictSet(model_Hstorylist, nowSelected, [1, 'textrue', changeSelect, dictGet(selectObj, 'name'), dictGet(selectObj, 'creator'), dictGet(selectObj, 'description')]);
                            console.log('modelHistorylist', model_Hstorylist);
                        });
                    } else if (dictGet(selectObj, 'motype') == 'video') {
                        if (selectObj.type_animation == 'mp4') {
                            let nowVideo2 = String(usingURL) + String(dictGet(selectObj, 'data_animation')[0]);
                            changeSelect = String(usingURL) + String(dictGet(selectObj, 'data_img')[0]);
                            dictSet(dictGet(talData, nowSelected), 'motype', 'video');
                            dictSet(dictGet(talData, nowSelected), 'url', String(usingURL) + String(dictGet(selectObj, 'data_animation')[0]));
                            dictSet(dictGet(talData, nowSelected), 'token_id', selectObj.opensea_id)
                            dictSet(dictGet(talData, nowSelected), 'label', selectObj.label);
                            dictSet(dictGet(talData, nowSelected), 'preview', String(usingURL) + String(dictGet(selectObj, 'data_img')[0]));

                            //switchHistory[0] = String(usingURL) + String(dictGet(selectObj, 'data_animation')[0]);
                            replaceTexture(nowSelected, nowSelected, changeSelect, function() {
                                if (swpro_SizeAs <= 1) {
                                    setObjTransform(nowSelected, false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                                } else {
                                    setObjTransform(nowSelected, false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                                }
                                replaceTexture(nowSelected, nowSelected, loadVideo(nowVideo2), function() {});
                                dictSet(model_Hstorylist, nowSelected, [1, 'video', changeSelect, dictGet(selectObj, 'name'), dictGet(selectObj, 'creator'), dictGet(selectObj, 'description')]);

                            });
                        } else if (selectObj.type_animation == 'mp3') {
                            changeSelect = String(usingURL) + String(dictGet(selectObj, 'data_img')[0]);
                            dictSet(dictGet(talData, nowSelected), 'motype', 'video');
                            dictSet(dictGet(talData, nowSelected), 'url', changeSelect);
                            dictSet(dictGet(talData, nowSelected), 'token_id', selectObj.opensea_id)
                            dictSet(dictGet(talData, nowSelected), 'label', selectObj.label);

                            //switchHistory[0] = changeSelect;
                            replaceTexture(nowSelected, nowSelected, changeSelect, function() {
                                if (swpro_SizeAs <= 1) {
                                    setObjTransform(nowSelected, false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                                } else {
                                    setObjTransform(nowSelected, false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                                }
                                dictSet(model_Hstorylist, nowSelected, [1, 'textrue', changeSelect, dictGet(selectObj, 'name'), dictGet(selectObj, 'creator'), dictGet(selectObj, 'description')]);
                                console.log('modelHistorylist', model_Hstorylist);
                            });
                        }
                    } else if (dictGet(selectObj, 'motype') == 'html') {
                        changeSelect = String(usingURL) + String(dictGet(selectObj, 'data_img')[0]);
                        dictSet(dictGet(talData, nowSelected), 'motype', 'html');
                        // dictSet(dictGet(talData, lookItem), 'url', String(usingURL) + String(dictGet(selectObj, 'data_animation')[0]));
                        dictSet(dictGet(talData, nowSelected), 'url', dictGet(selectObj, 'data_animation')[0]);
                        dictSet(dictGet(talData, nowSelected), 'token_id', selectObj.opensea_id)
                        dictSet(dictGet(talData, nowSelected), 'label', selectObj.label);

                        //switchHistory[0] = String(usingURL) + String(dictGet(selectObj, 'data_animation')[0]);
                        replaceTexture(nowSelected, nowSelected, changeSelect, function() {
                            if (swpro_SizeAs <= 1) {
                                setObjTransform(nowSelected, false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                            } else {
                                setObjTransform(nowSelected, false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                            }
                            dictSet(model_Hstorylist, nowSelected, [1, 'html', changeSelect, dictGet(selectObj, 'name'), dictGet(selectObj, 'creator'), dictGet(selectObj, 'description')]);

                        });
                    } else if (dictGet(selectObj, 'motype') == 'svg') {
                        changeSelect = String(usingURL) + String(dictGet(selectObj, 'data_img')[0]);
                        dictSet(dictGet(talData, nowSelected), 'motype', 'svg');
                        dictSet(dictGet(talData, nowSelected), 'url', changeSelect);
                        dictSet(dictGet(talData, nowSelected), 'token_id', selectObj.opensea_id)
                        dictSet(dictGet(talData, nowSelected), 'label', selectObj.label);

                        //switchHistory[0] = changeSelect;
                        replaceTexture(nowSelected, nowSelected, changeSelect, function() {
                            if (swpro_SizeAs <= 1) {
                                setObjTransform(nowSelected, false, 'scale', [0.36 * 1.4 * 1.6, '', 0.36 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                            } else {
                                setObjTransform(nowSelected, false, 'scale', [0.5 * 1.4 * 1.6, '', 0.5 * ((1.4 * 1.6) / swpro_SizeAs)], false);
                            }
                            dictSet(model_Hstorylist, nowSelected, [1, 'svg', changeSelect, dictGet(selectObj, 'name'), dictGet(selectObj, 'creator'), dictGet(selectObj, 'description')]);
                            console.log('modelHistorylist', model_Hstorylist);
                        });
                    }
                }

            }
            // createVector puzzle
            function createVector(x, y, z) {
                return [x, y, z];
            };



            // setActiveCamera puzzle
            function setActiveCamera(camName) {
                var camera = getObjectByName(camName);
                if (!camera || !camera.isCamera || appInstance.getCamera() == camera)
                    return;
                appInstance.setCamera(camera);
            }



            // getVectorValue puzzle
            function getVectorValue(vector, value) {

                var vector = _pGlob.vec3Tmp.fromArray(vector);

                switch (value) {
                    case 'X':
                        return vector.x;
                    case 'Y':
                        return vector.y;
                    case 'Z':
                        return vector.z;
                    case 'IS_ZERO':
                        return Boolean(vector.length() <= Number.EPSILON);
                    case 'LENGTH':
                        return vector.length();
                    case 'NEGATED':
                        return [-vector.x, -vector.y, -vector.z];
                    case 'NORMALIZED':
                        return vector.normalize().toArray();
                    default:
                        console.error('get value from vector: Wrong value');
                        return;
                }
            };



            // tweenCamera puzzle
            function tweenCamera(posOrObj, targetOrObj, duration, doSlot, movementType) {
                var camera = appInstance.getCamera();

                if (Array.isArray(posOrObj)) {
                    var worldPos = _pGlob.vec3Tmp.fromArray(posOrObj);
                    worldPos = coordsTransform(worldPos, getCoordSystem(), 'Y_UP_RIGHT');
                } else if (posOrObj) {
                    var posObj = getObjectByName(posOrObj);
                    if (!posObj) return;
                    var worldPos = posObj.getWorldPosition(_pGlob.vec3Tmp);
                } else {
                    // empty input means: don't change the position
                    var worldPos = camera.getWorldPosition(_pGlob.vec3Tmp);
                }

                if (Array.isArray(targetOrObj)) {
                    var worldTarget = _pGlob.vec3Tmp2.fromArray(targetOrObj);
                    worldTarget = coordsTransform(worldTarget, getCoordSystem(), 'Y_UP_RIGHT');
                } else {
                    var targObj = getObjectByName(targetOrObj);
                    if (!targObj) return;
                    var worldTarget = targObj.getWorldPosition(_pGlob.vec3Tmp2);
                }

                duration = Math.max(0, duration);

                if (appInstance.controls && appInstance.controls.tween) {
                    // orbit and flying cameras
                    if (!appInstance.controls.inTween) {
                        appInstance.controls.tween(worldPos, worldTarget, duration, doSlot,
                            movementType);
                    }
                } else {
                    // TODO: static camera, just position it for now
                    if (camera.parent) {
                        camera.parent.worldToLocal(worldPos);
                    }
                    camera.position.copy(worldPos);
                    camera.lookAt(worldTarget);
                    doSlot();
                }
            }



            // getActiveCamera puzzle
            function getActiveCamera() {
                var camera = appInstance.getCamera();
                return camera.name;
            }




            function initGetCameraDirection() {
                var coordsCallback = function(event) {
                    var xNorm = 0,
                        yNorm = 0;
                    if (event instanceof MouseEvent) {
                        xNorm = event.offsetX / elem.clientWidth;
                        yNorm = event.offsetY / elem.clientHeight;
                    } else if (event instanceof TouchEvent) {
                        var rect = elem.getBoundingClientRect();
                        xNorm = (event.changedTouches[0].clientX - rect.left) / rect.width;
                        yNorm = (event.changedTouches[0].clientY - rect.top) / rect.height;
                    }

                    _pGlob.screenCoords.x = xNorm * 2 - 1;
                    _pGlob.screenCoords.y = -yNorm * 2 + 1;
                }

                var elem = appInstance.container;
                elem.addEventListener('mousemove', coordsCallback);
                elem.addEventListener('mousedown', coordsCallback);
                elem.addEventListener('mouseup', coordsCallback);
                elem.addEventListener('touchstart', coordsCallback);
                elem.addEventListener('touchend', coordsCallback);

                if (v3d.PL.editorEventListeners) {
                    v3d.PL.editorEventListeners.push([elem, 'mousemove', coordsCallback]);
                    v3d.PL.editorEventListeners.push([elem, 'mousedown', coordsCallback]);
                    v3d.PL.editorEventListeners.push([elem, 'mouseup', coordsCallback]);
                    v3d.PL.editorEventListeners.push([elem, 'touchstart', coordsCallback]);
                    v3d.PL.editorEventListeners.push([elem, 'touchend', coordsCallback]);
                }

            };

            initGetCameraDirection();




            // getCameraDirection puzzle

            var getCameraDirection = function() {

                var coords = new v3d.Vector2();
                var vec = new v3d.Vector3();

                return function getCameraDirection(useMouseTouch, inverted) {
                    var camera = appInstance.getCamera(true);

                    if (useMouseTouch) {

                        if (inverted) {
                            coords.x = -_pGlob.screenCoords.x;
                            coords.y = -_pGlob.screenCoords.y;
                        } else {
                            coords.x = _pGlob.screenCoords.x;
                            coords.y = _pGlob.screenCoords.y;
                        }

                        if (camera && camera.isOrthographicCamera) {
                            const raycaster = _pGlob.raycasterTmp;

                            var distance = vec.subVectors(camera.position, appInstance.scene.position).length();
                            var point = vec.set(0, 0, distance).project(camera);
                            point.x = coords.x;
                            point.y = coords.y;
                            point.unproject(camera);

                            raycaster.ray.origin.setFromMatrixPosition(camera.matrixWorld);
                            raycaster.ray.direction.copy(point).sub(raycaster.ray.origin).normalize();
                        } else {
                            _pGlob.raycasterTmp.setFromCamera(coords, camera);
                        }

                        var dir = _pGlob.raycasterTmp.ray.direction;
                    } else {
                        var dir = camera.getWorldDirection(vec);
                    }

                    return coordsTransform(dir, 'Y_UP_RIGHT', getCoordSystem()).toArray();
                }
            }();



            // raycast puzzle
            function raycast(fromPosObj, dir, intersectObjsSelector) {

                if (!fromPosObj || !dir) {
                    console.error('raycast: missing input');
                    return [];
                }

                if (Array.isArray(fromPosObj)) {
                    var from = _pGlob.vec3Tmp.fromArray(fromPosObj);
                    from = coordsTransform(from, getCoordSystem(), 'Y_UP_RIGHT');
                } else {
                    var posObj = getObjectByName(fromPosObj);
                    if (!posObj) {
                        console.error('raycast: raycast object not found');
                        return []
                    }
                    var from = posObj.getWorldPosition(_pGlob.vec3Tmp);
                }

                dir = _pGlob.vec3Tmp2.fromArray(dir);
                dir = coordsTransform(dir, getCoordSystem(), 'Y_UP_RIGHT');

                if (intersectObjsSelector === '' || intersectObjsSelector === LIST_NONE) {

                    var objs = [appInstance.scene];

                } else {

                    var objs = retrieveObjectNames(intersectObjsSelector).map(function(objName) {
                        return getObjectByName(objName);
                    });

                }

                if (objs.length) {
                    _pGlob.raycasterTmp.set(from, dir);
                    var intersects = _pGlob.raycasterTmp.intersectObjects(objs, true);

                    for (var i = 0; i < intersects.length; i++) {
                        var int = intersects[i];

                        int.object = getPickedObjectName(int.object);
                        int.point = coordsTransform(int.point, 'Y_UP_RIGHT', getCoordSystem()).toArray();

                        if (int.face)
                            int.normal = coordsTransform(int.face.normal, 'Y_UP_RIGHT', getCoordSystem()).toArray();

                        if (int.uv)
                            int.uv = int.uv.toArray();

                        delete int.face;
                        delete int.faceIndex;

                    }

                    return intersects;
                } else {
                    return [];
                }
            }



            // distanceBetweenObjects puzzle
            function getDistanceBetweenObjects(objName1, objName2) {
                if (!objName1 || !objName2)
                    return;
                var obj1 = getObjectByName(objName1);
                var obj2 = getObjectByName(objName2);
                if (!obj1 || !obj2)
                    return;
                return obj1.getWorldPosition(_pGlob.vec3Tmp).distanceTo(obj2.getWorldPosition(_pGlob.vec3Tmp2));
            }



            // whenMoved puzzle
            function whenMoved(objSelector, velocity, cbStart, cbMove, cbStop) {

                _pGlob.objMovementInfos = _pGlob.objMovementInfos || {};

                function savePreviousCoords(objName, obj, prevIsMoving) {
                    // GC optimization
                    if (_pGlob.objMovementInfos[objName]) {
                        var info = _pGlob.objMovementInfos[objName];

                        info.prevPosX = obj.position.x;
                        info.prevPosY = obj.position.y;
                        info.prevPosZ = obj.position.z;
                        info.prevRotX = obj.rotation.x;
                        info.prevRotY = obj.rotation.y;
                        info.prevRotZ = obj.rotation.z;
                        info.prevScaX = obj.scale.x;
                        info.prevScaY = obj.scale.y;
                        info.prevScaZ = obj.scale.z;
                        info.prevIsMoving = prevIsMoving;
                    } else {
                        var info = {
                            prevPosX: obj.position.x,
                            prevPosY: obj.position.y,
                            prevPosZ: obj.position.z,
                            prevRotX: obj.rotation.x,
                            prevRotY: obj.rotation.y,
                            prevRotZ: obj.rotation.z,
                            prevScaX: obj.scale.x,
                            prevScaY: obj.scale.y,
                            prevScaZ: obj.scale.z,
                            prevIsMoving: prevIsMoving
                        };
                        _pGlob.objMovementInfos[objName] = info;
                    }

                    return info;
                }

                function checkMoving(objName, obj, elapsed) {

                    var info = _pGlob.objMovementInfos[objName] ||
                        savePreviousCoords(objName, obj, false);

                    var delta = velocity * elapsed;

                    var isMoving =
                        Math.abs(obj.position.x - info.prevPosX) > delta ||
                        Math.abs(obj.position.y - info.prevPosY) > delta ||
                        Math.abs(obj.position.z - info.prevPosZ) > delta ||
                        Math.abs(obj.rotation.x - info.prevRotX) > delta ||
                        Math.abs(obj.rotation.y - info.prevRotY) > delta ||
                        Math.abs(obj.rotation.z - info.prevRotZ) > delta ||
                        Math.abs(obj.scale.x - info.prevScaX) > delta ||
                        Math.abs(obj.scale.y - info.prevScaY) > delta ||
                        Math.abs(obj.scale.z - info.prevScaZ) > delta;

                    if (!info.prevIsMoving && isMoving) {
                        cbStart(objName);
                        savePreviousCoords(objName, obj, true);
                    } else if (info.prevIsMoving && isMoving) {
                        cbMove(objName);
                        savePreviousCoords(objName, obj, true);
                    } else if (info.prevIsMoving && !isMoving) {
                        cbStop(objName);
                        savePreviousCoords(objName, obj, false);
                    } else {
                        savePreviousCoords(objName, obj, false);
                    }
                }

                function addToRender(objSelector) {

                    function renderCb(elapsed, timeline) {

                        var objNames = retrieveObjectNames(objSelector);

                        for (var i = 0; i < objNames.length; i++) {
                            var objName = objNames[i];

                            var obj = getObjectByName(objName);
                            if (!obj)
                                return;

                            checkMoving(objName, obj, elapsed);
                        }
                    }

                    appInstance.renderCallbacks.push(renderCb);
                    if (v3d.PL.editorRenderCallbacks)
                        v3d.PL.editorRenderCallbacks.push([appInstance, renderCb]);

                }

                addToRender(objSelector);

            }



            // 开启物理模块

            // createPhysicsWorld puzzle

            // TEMPORARY MEASURE TO PREVENT CRASH [TODO]
            // 开启物理模块

            // createPhysicsWorld puzzle

            // TEMPORARY MEASURE TO PREVENT CRASH [TODO]
            if (window.Ammo) {

                var CF_STATIC_OBJECT = 1;
                var CF_KINEMATIC_OBJECT = 2;
                var CF_NO_CONTACT_RESPONSE = 4;

                var ACTIVE_TAG = 1;
                var ISLAND_SLEEPING = 2;
                var DISABLE_DEACTIVATION = 4;
                var DISABLE_SIMULATION = 5;

                var RO_XYZ = 0;

                // collision filter groups
                var DefaultFilter = 1;
                var StaticFilter = 2;
                var KinematicFilter = 4;
                var DebrisFilter = 8;
                var SensorTrigger = 16;
                var CharacterFilter = 32;
                var AllFilter = -1;

                if (false) {

                    _pGlob.collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
                    _pGlob.dispatcher = new Ammo.btCollisionDispatcher(_pGlob.collisionConfiguration);
                    _pGlob.broadphase = new Ammo.btDbvtBroadphase();
                    _pGlob.solver = new Ammo.btSequentialImpulseConstraintSolver();
                    _pGlob.softBodySolver = new Ammo.btDefaultSoftBodySolver();
                    _pGlob.world = new Ammo.btSoftRigidDynamicsWorld(_pGlob.dispatcher, _pGlob.broadphase,
                        _pGlob.solver, _pGlob.collisionConfiguration, _pGlob.softBodySolver);
                    _pGlob.world.getWorldInfo().set_m_gravity(new Ammo.btVector3(0, -9.8, 0));

                    _pGlob.softBodyHelpers = new Ammo.btSoftBodyHelpers();

                } else {

                    _pGlob.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
                    _pGlob.dispatcher = new Ammo.btCollisionDispatcher(_pGlob.collisionConfiguration);
                    _pGlob.broadphase = new Ammo.btDbvtBroadphase();
                    _pGlob.solver = new Ammo.btSequentialImpulseConstraintSolver();
                    _pGlob.world = new Ammo.btDiscreteDynamicsWorld(_pGlob.dispatcher, _pGlob.broadphase,
                        _pGlob.solver, _pGlob.collisionConfiguration);

                }

                _pGlob.syncList = [];
                _pGlob.consList = [];

                // internal info
                _pGlob.collisionData = [];

                // goes to collision callback
                _pGlob.collisionInfo = {
                    objectA: '',
                    objectB: '',
                    distance: 0,
                    positionOnA: [0, 0, 0],
                    positionOnB: [0, 0, 0],
                    normalOnB: [0, 0, 0]
                };

                _pGlob.fps = 60;
                _pGlob.transTmp = new Ammo.btTransform();
                _pGlob.transTmp2 = new Ammo.btTransform();

                _pGlob.world.setGravity(new Ammo.btVector3(0, -9.8, 0));

                // external physics interface
                if (v3d.PL) {
                    v3d.PL.physics = v3d.PL.physics || {};
                    v3d.PL.physics.world = _pGlob.world;
                    v3d.PL.physics.bodies = {};
                    v3d.PL.physics.constraints = {};
                    v3d.PL.physics.addToSyncList = function(obj, body, type) {
                        _pGlob.syncList.push({
                            obj: obj,
                            body: body,
                            type: type,
                            simulated: true,
                            mass: (body.getInvMass() !== 0) ? 1.0 / body.getInvMass() : 0
                        });
                        v3d.PL.physics.bodies[obj.name] = body;
                    }
                    v3d.PL.physics.removeFromSyncList = function(obj, body) {
                        _pFindRemovePhysicsBody(obj);
                        delete v3d.PL.physics.bodies[obj.name];
                    }
                }

                function tick(dt) {

                    var DISTANCE_EPSILON = 0.000001;

                    if (_pGlob.collisionData.length) {

                        var numManifolds = _pGlob.world.getDispatcher().getNumManifolds();

                        for (var i = 0; i < numManifolds; i++) {
                            var contactManifold = _pGlob.world.getDispatcher().getManifoldByIndexInternal(i);

                            var bodyA = Ammo.castObject(contactManifold.getBody0(), Ammo.btRigidBody);
                            var bodyB = Ammo.castObject(contactManifold.getBody1(), Ammo.btRigidBody);

                            var collDataMatch = null;
                            var objsSwapped = false;

                            for (var j = 0; j < _pGlob.collisionData.length; j++) {
                                var cd = _pGlob.collisionData[j];

                                if (cd.bodyA == bodyA && cd.bodyB == bodyB) {
                                    collDataMatch = cd;
                                    break;
                                }

                                if (cd.bodyA == bodyB && cd.bodyB == bodyA) {
                                    collDataMatch = cd;
                                    objsSwapped = true;
                                    break;
                                }
                            }

                            if (!collDataMatch)
                                continue;

                            var numContacts = contactManifold.getNumContacts();

                            for (var j = 0; j < numContacts; j++) {
                                var pt = contactManifold.getContactPoint(j);

                                if (pt.getDistance() < DISTANCE_EPSILON) {
                                    var ptA = pt.getPositionWorldOnA();
                                    var ptB = pt.getPositionWorldOnB();
                                    var noB = pt.get_m_normalWorldOnB();

                                    _pGlob.collisionInfo.objectA = collDataMatch.objA ? getPickedObjectName(collDataMatch.objA) : '';
                                    _pGlob.collisionInfo.objectB = collDataMatch.objB ? getPickedObjectName(collDataMatch.objB) : '';

                                    _pGlob.collisionInfo.distance = pt.getDistance();

                                    if (!objsSwapped) {
                                        _pGlob.collisionInfo.positionOnA[0] = ptA.x();
                                        _pGlob.collisionInfo.positionOnA[1] = ptA.y();
                                        _pGlob.collisionInfo.positionOnA[2] = ptA.z();

                                        _pGlob.collisionInfo.positionOnB[0] = ptB.x();
                                        _pGlob.collisionInfo.positionOnB[1] = ptB.y();
                                        _pGlob.collisionInfo.positionOnB[2] = ptB.z();

                                        _pGlob.collisionInfo.normalOnB[0] = noB.x();
                                        _pGlob.collisionInfo.normalOnB[1] = noB.y();
                                        _pGlob.collisionInfo.normalOnB[2] = noB.z();
                                    } else {
                                        _pGlob.collisionInfo.positionOnA[0] = ptB.x();
                                        _pGlob.collisionInfo.positionOnA[1] = ptB.y();
                                        _pGlob.collisionInfo.positionOnA[2] = ptB.z();

                                        _pGlob.collisionInfo.positionOnB[0] = ptA.x();
                                        _pGlob.collisionInfo.positionOnB[1] = ptA.y();
                                        _pGlob.collisionInfo.positionOnB[2] = ptA.z();

                                        _pGlob.collisionInfo.normalOnB[0] = -noB.x();
                                        _pGlob.collisionInfo.normalOnB[1] = -noB.y();
                                        _pGlob.collisionInfo.normalOnB[2] = -noB.z();
                                    }

                                    collDataMatch.collideCb();

                                    // mark as collided all collision data from the same exec instance
                                    for (var k = 0; k < _pGlob.collisionData.length; k++) {
                                        var cd = _pGlob.collisionData[k];
                                        if (cd.execInstanceID == collDataMatch.execInstanceID) {
                                            cd.collideFlag = true;
                                        }
                                    }
                                }
                            }
                        }

                        for (var i = 0; i < _pGlob.collisionData.length; i++) {
                            var cd = _pGlob.collisionData[i];

                            if (!cd.collideFlag) {
                                _pGlob.collisionInfo.objectA = '';
                                _pGlob.collisionInfo.objectB = '';

                                _pGlob.collisionInfo.distance = 0;

                                _pGlob.collisionInfo.positionOnA[0] = 0;
                                _pGlob.collisionInfo.positionOnA[1] = 0;
                                _pGlob.collisionInfo.positionOnA[2] = 0;

                                _pGlob.collisionInfo.positionOnB[0] = 0;
                                _pGlob.collisionInfo.positionOnB[1] = 0;
                                _pGlob.collisionInfo.positionOnB[2] = 0;

                                _pGlob.collisionInfo.normalOnB[0] = 0;
                                _pGlob.collisionInfo.normalOnB[1] = 0;
                                _pGlob.collisionInfo.normalOnB[2] = 0;

                                cd.noCollideCb();

                                // no need to process other collision data from the same exec instance
                                for (var j = i + 1; j < _pGlob.collisionData.length; j++) {
                                    var cdj = _pGlob.collisionData[j];
                                    if (cdj.execInstanceID == cd.execInstanceID) {
                                        cdj.collideFlag = true;
                                    }
                                }
                            }

                            cd.collideFlag = false;
                        }
                    }

                    _pGlob.world.stepSimulation(dt, 10, 1 / 60);

                    // sync physics and graphics

                    for (var i = 0; i < _pGlob.syncList.length; i++) {
                        var syncData = _pGlob.syncList[i];
                        if (!syncData.simulated)
                            continue;

                        var body = syncData.body;

                        if (syncData.type == 'SOFT_BODY') {

                            var geometry = syncData.obj.geometry;
                            var volumePositions = geometry.attributes.position.array;
                            var volumeNormals = geometry.ammoNeedNormals ? geometry.attributes.normal.array : null;

                            var association = geometry.ammoIndexAssociation;
                            var numVerts = association.length;
                            var nodes = body.get_m_nodes();

                            for (var j = 0; j < numVerts; j++) {

                                var node = nodes.at(j);

                                var nodePos = node.get_m_x();
                                var x = nodePos.x();
                                var y = nodePos.y();
                                var z = nodePos.z();

                                if (volumeNormals) {
                                    var nodeNormal = node.get_m_n();
                                    var nx = nodeNormal.x();
                                    var ny = nodeNormal.y();
                                    var nz = nodeNormal.z();
                                }

                                var assocVertex = association[j];

                                for (var k = 0, kl = assocVertex.length; k < kl; k++) {

                                    var indexVertex = assocVertex[k];
                                    volumePositions[indexVertex] = x;
                                    if (volumeNormals)
                                        volumeNormals[indexVertex] = nx;

                                    indexVertex++;
                                    volumePositions[indexVertex] = y;
                                    if (volumeNormals)
                                        volumeNormals[indexVertex] = ny;

                                    indexVertex++;
                                    volumePositions[indexVertex] = z;
                                    if (volumeNormals)
                                        volumeNormals[indexVertex] = nz;

                                }

                            }

                            geometry.attributes.position.needsUpdate = true;
                            if (volumeNormals)
                                geometry.attributes.normal.needsUpdate = true;

                            if (geometry.attributes.previous) {
                                v3d.MeshLine.updateAttributes(geometry);
                            }

                        } else if (!body.isStaticOrKinematicObject()) {
                            var ms = body.getMotionState();
                            if (ms) {
                                ms.getWorldTransform(_pGlob.transTmp);
                                var p = _pGlob.transTmp.getOrigin();
                                var q = _pGlob.transTmp.getRotation();
                                // dynamic objects can't be parented to something
                                syncData.obj.position.set(p.x(), p.y(), p.z());
                                syncData.obj.quaternion.set(q.x(), q.y(), q.z(), q.w());
                            }

                        } else if (body.isKinematicObject()) {

                            var pos = syncData.obj.getWorldPosition(_pGlob.vec3Tmp);
                            var quat = syncData.obj.getWorldQuaternion(_pGlob.quatTmp);

                            _pGlob.transTmp.setIdentity();
                            _pGlob.transTmp.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
                            _pGlob.transTmp.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));

                            body.setWorldTransform(_pGlob.transTmp);

                            // needed to calculate interpolated velocity
                            body.getMotionState().setWorldTransform(_pGlob.transTmp);

                        }
                    }

                }

                appInstance.renderCallbacks.push(tick);
                if (v3d.PL.editorRenderCallbacks)
                    v3d.PL.editorRenderCallbacks.push([appInstance, tick]);

                // END OF TEMPORARY MEASURE TO PREVENT CRASH [TODO]
            }


            editJson = dictGet(getUrlData('PARAMS', false), 'EditJson');
            ExhibitionHall_ID = dictGet(getUrlData('PARAMS', false), 'model');
            /* 兼容 */
            if (featureAvailable('ANDROID') || featureAvailable('IE')) {

                operateAnimation('SET_FRAME', 'Light', 2, null, 'AUTO', 1,
                    function() {}, undefined, false);

            } else {

                operateAnimation('SET_FRAME', 'Light', 1, null, 'AUTO', 1,
                    function() {}, undefined, false);

            }
            DeviceInformation = {};
            if (featureAvailable('CHROME')) {
                dictSet(DeviceInformation, 'Internet Explorer', 'flase');
            } else if (featureAvailable('FIREFOX')) {
                dictSet(DeviceInformation, 'Internet Explorer', 'flase');
            } else if (featureAvailable('IE')) {
                dictSet(DeviceInformation, 'Internet Explorer', 'true');
            } else if (featureAvailable('EDGE')) {
                dictSet(DeviceInformation, 'Internet Explorer', 'flase');
            } else if (featureAvailable('SAFARI')) {
                dictSet(DeviceInformation, 'Internet Explorer', 'flase');
            }
            if (featureAvailable('TOUCH')) {
                dictSet(DeviceInformation, 'Touch Screen', 'True');
            } else {
                dictSet(DeviceInformation, 'Touch Screen', 'False');
            }
            if (featureAvailable('RETINA')) {
                dictSet(DeviceInformation, 'Retina Display(HiDPI)', 'True');
            } else {
                dictSet(DeviceInformation, 'Retina Display(HiDPI)', 'False');
            }
            if (featureAvailable('HDR')) {
                dictSet(DeviceInformation, 'High Dynamic Range(HDR)', 'True');
            } else {
                dictSet(DeviceInformation, 'High Dynamic Range(HDR)', 'False');
            }
            if (featureAvailable('WEBAUDIO')) {
                dictSet(DeviceInformation, 'Web Audio API', 'True');
            } else {
                dictSet(DeviceInformation, 'Web Audio API', 'False');
            }
            if (featureAvailable('WEBGL2')) {
                dictSet(DeviceInformation, 'WebGL 2.0', 'True');
            } else {
                dictSet(DeviceInformation, 'WebGL 2.0', 'False');
            }
            dictSet(DeviceInformation, 'vendor', getGPU('VENDOR'));
            dictSet(DeviceInformation, 'model', getGPU('MODEL'));
            dictSet(DeviceInformation, 'time', getDateTime('FULL', true));
            dictSet(DeviceInformation, 'item', getHTMLElemAttribute('innerHTML', 'itemID', false));
            dictSet(DeviceInformation, 'product', dictGet(getUrlData('PARAMS', false), 'product'));
            registerSetTimeout(0.5, function() {
                dictSet(DeviceInformation, 'UserAgent', getJSFunction('ua')());
            });

            registerOnClick(['ALL_OBJECTS'], false, false, [0, 1, 2], function() {
                if (_pGlob.pickedObject.indexOf('Product_') == 0) {
                    nowSelected = _pGlob.pickedObject;
                    if (nowSelected == 'Product_6.001') {
                        nowSelected = 'Product_6';
                    }
                    console.log('nowSelected:', nowSelected)
                    getNowproduct();
                    setHTMLElemStyle('display', 'block', ['QUERYSELECTOR', '.imgchoose'], false);
                    // setHTMLElemStyle('display', 'block', ['QUERYSELECTOR', '.msgBox'], false);
                    /* 返回点击对象是否为视频 */
                    if (dictGet(model_Hstorylist, nowSelected)[0] && dictGet(dictGet(Data_shouldbeshow, nowSelected), 'token_id') == '') {
                        console.log('初始状态');
                        isthisVideo = 'no';
                        // setHTMLElemAttribute('innerHTML', ['请为：', nowSelected, '  添加画作'].join(''), 'msg2', false);
                        // setHTMLElemStyle('display', 'none', 'msg1', false);
                        // setHTMLElemStyle('display', 'none', 'msg3', false);
                    } else if (dictGet(dictGet(Data_shouldbeshow, nowSelected), 'motype') == 'video' && dictGet(dictGet(Data_shouldbeshow, nowSelected), 'token_id') != '') {

                        isthisVideo = 'yes';
                        // setHTMLElemStyle('display', 'block', 'msg1', false);
                        // setHTMLElemStyle('display', 'block', 'msg2', false);

                        // setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, nowSelected), 'name'), 'msg1', false);
                        // setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, nowSelected), 'creator'), 'msg2', false);

                        let thisfirstVideo = window.urls + dictGet(dictGet(Data_shouldbeshow, nowSelected), 'url');
                        console.log('更换过的视频状态', thisfirstVideo);
                        // replaceTexture(nowSelected, nowSelected, loadVideo(thisfirstVideo), function () {
                        //     playSound(loadVideo(thisfirstVideo), true);
                        // });
                    } else if (dictGet(dictGet(Data_shouldbeshow, nowSelected), 'motype') == 'textrue' && dictGet(dictGet(Data_shouldbeshow, nowSelected), 'token_id') != '') {
                        console.log('更换过但是不是视频的状态');
                        // setHTMLElemStyle('display', 'block', 'msg1', false);
                        // setHTMLElemStyle('display', 'block', 'msg2', false);

                        // setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, nowSelected), 'name'), 'msg1', false);
                        // setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, nowSelected), 'creator'), 'msg2', false);

                        isthisVideo = 'no';
                    } else if (!dictGet(model_Hstorylist, nowSelected)[0]) {
                        console.log('刚刚更换过的状态');
                        // setHTMLElemStyle('display', 'block', 'msg1', false);
                        // setHTMLElemStyle('display', 'block', 'msg2', false);

                        // setHTMLElemAttribute('innerHTML', dictGet(model_Hstorylist, nowSelected)[3], 'msg1', false);
                        // setHTMLElemAttribute('innerHTML', dictGet(model_Hstorylist, nowSelected)[4], 'msg2', false);

                        if (dictGet(model_Hstorylist, nowSelected)[1] == 'video') {
                            isthisVideo = 'yes';
                            // replaceTexture(nowSelected, nowSelected, loadVideo(dictGet(model_Hstorylist, nowSelected)[2]), function () {
                            //     playSound(loadVideo(dictGet(model_Hstorylist, nowSelected)[2]), false);
                            // });
                        } else if (dictGet(model_Hstorylist, nowSelected)[1] == 'textrue') {
                            isthisVideo = 'no';
                        }
                    } else if (dictGet(dictGet(Data_shouldbeshow, nowSelected), 'motype') == 'html' && dictGet(dictGet(Data_shouldbeshow, nowSelected), 'token_id') != '') {
                        isthisVideo = 'no';
                        console.log('html');
                        // setHTMLElemStyle('display', 'block', 'msg1', false);
                        // setHTMLElemStyle('display', 'block', 'msg2', false);

                        // setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, nowSelected), 'name'), 'msg1', false);
                        // setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, nowSelected), 'creator'), 'msg2', false);

                    } else if (dictGet(dictGet(Data_shouldbeshow, nowSelected), 'motype') == 'svg' && dictGet(dictGet(Data_shouldbeshow, nowSelected), 'token_id') != '') {
                        isthisVideo = 'no';
                        console.log('svg');
                        // setHTMLElemStyle('display', 'block', 'msg1', false);
                        // setHTMLElemStyle('display', 'block', 'msg2', false);

                        // setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, nowSelected), 'name'), 'msg1', false);
                        // setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, nowSelected), 'creator'), 'msg2', false);

                    }
                }
            }, function() {});
            talData = {};
            newableItem = {};
            model_Hstorylist = {};

            playState = 0;
            v_switchTime = 0;
            switchHistory = [];
            /* ???? */
            function setHTMLElemAttribute(attr, value, ids, isParent) {
                var elems = getElements(ids, isParent);
                for (var i = 0; i < elems.length; i++) {
                    var elem = elems[i];
                    if (!elem) continue;

                    if (attr === 'style') {
                        // NOTE: setting an attribute 'style' instead of a property 'style'
                        // fixes IE11 wrong behavior
                        elem.setAttribute(attr, value);
                    } else if ((attr == 'href' || attr == 'src') && value instanceof Promise) {
                        // resolve promise value for url-based attributes
                        value.then(function(response) {
                            elem[attr] = response;
                        });
                    } else {
                        elem[attr] = value;
                    }
                }
            }
            播放状态 = 0;
            /* 读取相机信息 */
            camera_intial = createVector(0.03466096734809303, -12.120134264284127, 1.734356785718779);
            camera_Target = [0.051879837992083386, -17.92162661162511, 1.734356785718779];
            camera_Point = [-0.054382953793835245, 17.881114816614655, 1.734356785718779];
            setActiveCamera('Camera_FPS');
            //setObjTransform('Camera_FPS', false, 'position', [getVectorValue(camera_intial, 'X'), getVectorValue(camera_intial, 'Y'), getVectorValue(camera_intial, 'Z')], false);
            // tweenCamera(camera_Target, camera_Point, 1.6, function () { }, 1);

            whenMoved('Camera_FPS', 0.05, function() {
                lookItem = dictGet(raycast('Camera_FPS', getCameraDirection(false, false), ['ALL_OBJECTS'])[0], 'object');

                if (lookItem.indexOf('Product') != undefined && lookItem.indexOf('Product') == 0 && getDistanceBetweenObjects('Camera_FPS', lookItem) <= 3.6 && raycast('Camera_FPS', getCameraDirection(false, false), ['ALL_OBJECTS']).length > 0) {
                    getNowproduct();
                    setHTMLElemStyle('display', 'block', 'msgBox', false);
                    if (lookItem == 'Product_6.001') {
                        lookItem = 'Product_6'
                    }
                    console.log(lookItem)
                    if (dictGet(dictGet(Data_shouldbeshow, lookItem), 'token_id') == '' && dictGet(model_Hstorylist, lookItem)[0] == 'firststate') {
                        console.log('真·初始状态');
                        // setHTMLElemAttribute('innerHTML', ['请为：', lookItem, '  添加画作'].join(''), 'msg2', false);
                        setHTMLElemStyle('display', 'none', 'msg1', false);
                        setHTMLElemStyle('display', 'none', 'msg2', false);
                        setHTMLElemStyle('display', 'none', 'msg3', false);
                        setHTMLElemStyle('display', 'none', 'msgBox', false);
                    } else if (dictGet(dictGet(Data_shouldbeshow, lookItem), 'motype') == 'video' && dictGet(dictGet(Data_shouldbeshow, lookItem), 'token_id') != '' && dictGet(dictGet(Data_shouldbeshow, lookItem), 'firststate') == 0 && dictGet(model_Hstorylist, lookItem)[0] == 'firststate') {

                        setHTMLElemStyle('display', 'block', 'msg1', false);
                        setHTMLElemStyle('display', 'block', 'msg2', false);
                        setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, lookItem), 'name'), 'msg1', false);
                        setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, lookItem), 'creator'), 'msg2', false);

                        let thisfirstVideo = window.urls + dictGet(dictGet(Data_shouldbeshow, lookItem), 'url');
                        console.log('初始为视频的状态');


                        if (播放状态 == 0) {
                            playSound(loadVideo(thisfirstVideo), true);
                            播放状态 = 1
                        }
                    } else if (dictGet(dictGet(Data_shouldbeshow, lookItem), 'motype') == 'textrue' && dictGet(dictGet(Data_shouldbeshow, lookItem), 'token_id') != '' && dictGet(dictGet(Data_shouldbeshow, lookItem), 'firststate') == 0 && dictGet(model_Hstorylist, lookItem)[0] == 'firststate') {
                        console.log('初始为图片的状态');
                        setHTMLElemStyle('display', 'block', 'msg1', false);
                        setHTMLElemStyle('display', 'block', 'msg2', false);
                        setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, lookItem), 'name'), 'msg1', false);
                        setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, lookItem), 'creator'), 'msg2', false);
                    } else if (dictGet(model_Hstorylist, lookItem)[0] == 1) {

                        setHTMLElemStyle('display', 'block', 'msg1', false);
                        setHTMLElemStyle('display', 'block', 'msg2', false);
                        setHTMLElemAttribute('innerHTML', dictGet(model_Hstorylist, lookItem)[3], 'msg1', false);
                        setHTMLElemAttribute('innerHTML', dictGet(model_Hstorylist, lookItem)[4], 'msg2', false);
                        if (dictGet(model_Hstorylist, lookItem)[1] == 'video') {
                            if (播放状态 == 0) {
                                playSound(loadVideo(dictGet(model_Hstorylist, lookItem)[2]), false);
                                播放状态 = 1
                            }


                            console.log('这是换上去的视频');
                        } else if (dictGet(model_Hstorylist, lookItem)[1] == 'textrue') {
                            console.log('这是换上去的图片')
                        }
                    } else if (dictGet(dictGet(Data_shouldbeshow, lookItem), 'motype') == 'html' && dictGet(dictGet(Data_shouldbeshow, lookItem), 'token_id') != '' && dictGet(dictGet(Data_shouldbeshow, lookItem), 'firststate') == 0) {
                        console.log('初始的html');
                        setHTMLElemStyle('display', 'block', 'msg1', false);
                        setHTMLElemStyle('display', 'block', 'msg2', false);
                        setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, lookItem), 'name'), 'msg1', false);
                        setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, lookItem), 'creator'), 'msg2', false);
                    } else if (dictGet(dictGet(Data_shouldbeshow, lookItem), 'motype') == 'svg' && dictGet(dictGet(Data_shouldbeshow, lookItem), 'token_id') != '' && dictGet(dictGet(Data_shouldbeshow, lookItem), 'firststate') == 0) {
                        console.log('初始的svg');
                        setHTMLElemStyle('display', 'block', 'msg1', false);
                        setHTMLElemStyle('display', 'block', 'msg2', false);
                        setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, lookItem), 'name'), 'msg1', false);
                        setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, lookItem), 'creator'), 'msg2', false);
                    }
                } else {
                    setHTMLElemStyle('display', 'none', 'msgBox', false);
                    setHTMLElemStyle('display', 'none', 'msg1', false);
                    setHTMLElemStyle('display', 'none', 'msg2', false);
                    setHTMLElemAttribute('innerHTML', dictGet(dictGet(Data_shouldbeshow, lookItem), 'creator'), 'msg2', false);
                    // stopSound(loadVideo(dictGet(model_Hstorylist, lookItem)[2]));
                    console.log()
                    播放状态 = 0

                    for (let H = 1; H <= 22; H++) {
                        pauseSound(loadVideo(dictGet(model_Hstorylist, 'Product_' + String(H)[2])));
                    }
                    for (let B = 1; B <= 22; B++) {
                        pauseSound(loadVideo(window.urls + dictGet(dictGet(Data_shouldbeshow, 'Product_' + String(B)), 'url')));
                    }

                }
            }, function() {}, function() {});


            // eventHTMLElem puzzle
            function eventHTMLElem(eventType, ids, isParent, callback) {
                var elems = getElements(ids, isParent);
                for (var i = 0; i < elems.length; i++) {
                    var elem = elems[i];
                    if (!elem)
                        continue;
                    elem.addEventListener(eventType, callback);
                    if (v3d.PL.editorEventListeners)
                        v3d.PL.editorEventListeners.push([elem, eventType, callback]);
                }
            }



            // getEventProperty puzzle
            function getEventProperty(prop, event) {
                if (typeof event != "undefined") {
                    switch (prop) {
                        case 'target.id':
                            return event.target.id;
                        case 'target.value':
                            return event.target.value;
                        case 'touches.length':
                            return event.touches ? event.touches.length : 0;
                        case 'touches[0].pageX':
                            return event.touches[0].pageX;
                        case 'touches[0].pageY':
                            return event.touches[0].pageY;
                        case 'touches[1].pageX':
                            return event.touches[1].pageX;
                        case 'touches[1].pageY':
                            return event.touches[1].pageY;
                        default:
                            return event[prop];
                    }
                }
            }

            function getObjTransform(objName, isWorldSpace, mode, coord) {
                if (!objName)
                    return;
                var obj = getObjectByName(objName);
                if (!obj)
                    return;

                var coordSystem = getCoordSystem();

                var transformVal;

                if (isWorldSpace && obj.parent) {
                    if (mode === 'position') {
                        transformVal = coordsTransform(obj.getWorldPosition(_pGlob.vec3Tmp), 'Y_UP_RIGHT',
                            coordSystem, mode === 'scale');
                    } else if (mode === 'rotation') {
                        transformVal = coordsTransform(obj.getWorldEuler(_pGlob.eulerTmp, 'XYZ'), 'Y_UP_RIGHT',
                            coordSystem, mode === 'scale');
                    } else if (mode === 'scale') {
                        transformVal = coordsTransform(obj.getWorldScale(_pGlob.vec3Tmp), 'Y_UP_RIGHT',
                            coordSystem, mode === 'scale');
                    }

                } else if (mode === 'rotation' && coordSystem == 'Z_UP_RIGHT') {
                    transformVal = eulerV3DToBlenderShortest(obj.rotation,
                        _pGlob.eulerTmp);

                } else if (mode === 'rotation' && coordSystem == 'Y_UP_RIGHT') {
                    // Maya coordinates
                    // Use separate rotation interface to fix ambiguous rotations for Maya,
                    // might as well do the same for Blender/Max.

                    var rotUI = RotationInterface.initObject(obj);
                    transformVal = rotUI.getUserRotation(_pGlob.eulerTmp);

                } else {
                    transformVal = coordsTransform(obj[mode].clone(), 'Y_UP_RIGHT',
                        coordSystem, mode === 'scale');
                }

                if (mode === 'rotation') {
                    transformVal.x = v3d.MathUtils.radToDeg(transformVal.x);
                    transformVal.y = v3d.MathUtils.radToDeg(transformVal.y);
                    transformVal.z = v3d.MathUtils.radToDeg(transformVal.z);
                }

                if (coord == 'xyz') {
                    // remove order component for Euler vectors
                    return transformVal.toArray().slice(0, 3);
                } else {
                    return transformVal[coord];
                }
            }


            function _pFindRemovePhysicsBody(obj) {

                for (var i = 0; i < _pGlob.syncList.length; i++) {
                    var syncData = _pGlob.syncList[i];

                    if (syncData.obj == obj) {

                        if (syncData.type == 'SOFT_BODY')
                            _pGlob.world.removeSoftBody(syncData.body);
                        else
                            _pGlob.world.removeRigidBody(syncData.body);

                        Ammo.destroy(syncData.body);
                        _pGlob.syncList.splice(i, 1);
                        i--;
                    }
                }
            }


            function createPhysicsBody(type, objSelector, shape, mass) {

                if (!window.Ammo || !_pGlob.world)
                    return;

                var objNames = retrieveObjectNames(objSelector);

                objNames.forEach(function(objName) {
                    if (!objName)
                        return;

                    var obj = getObjectByName(objName);
                    if (!obj)
                        return;

                    _pFindRemovePhysicsBody(obj);

                    switch (shape) {
                        case 'BOX':
                        case 'CAPSULE':
                        case 'CONE':
                        case 'CYLINDER':

                            var box = new v3d.Box3();

                            obj.resolveMultiMaterial().forEach(function(objR) {
                                if (objR.geometry) {
                                    if (objR.geometry.boundingBox == null)
                                        objR.geometry.computeBoundingBox();

                                    box.union(objR.geometry.boundingBox);
                                }
                            });

                            var size = box.getSize(new v3d.Vector3());

                            // do not allow empty-sized shapes
                            size.x = size.x || 0.5;
                            size.y = size.y || 0.5;
                            size.z = size.z || 0.5;

                            if (shape == 'BOX') {
                                var geometry = new Ammo.btBoxShape(new Ammo.btVector3(
                                    size.x * 0.5, size.y * 0.5, size.z * 0.5));
                            } else if (shape == 'CAPSULE') {
                                var radius = Math.max(size.x, size.z) * 0.5;
                                var height = size.y - 2 * radius;
                                var geometry = new Ammo.btCapsuleShape(radius, height);
                            } else if (shape == 'CONE') {
                                var radius = Math.max(size.x, size.z) * 0.5;
                                var height = size.y;
                                var geometry = new Ammo.btConeShape(radius, height);
                            } else {
                                var geometry = new Ammo.btCylinderShape(new Ammo.btVector3(
                                    size.x * 0.5, size.y * 0.5, size.z * 0.5));
                            }

                            break;
                        case 'SPHERE':

                            var sphere = new v3d.Sphere();

                            obj.resolveMultiMaterial().forEach(function(objR) {

                                if (objR.geometry) {
                                    if (objR.geometry.boundingSphere === null)
                                        objR.geometry.computeBoundingSphere();

                                    sphere.union(objR.geometry.boundingSphere);
                                }
                            });

                            var geometry = new Ammo.btSphereShape(sphere.radius || 0.5);

                            break;
                        case 'MESH':

                            var objsR = obj.resolveMultiMaterial();

                            if (!objsR[0].geometry || !objsR[0].isMesh) {
                                console.error('create rigid body: incorrect mesh object');
                                var geometry = new Ammo.btEmptyShape();
                                break;
                            }

                            // allow complex triangle shapes for KINEMATIC objects
                            if (type == 'DYNAMIC' || type == 'GHOST') {

                                var geometry = new Ammo.btConvexHullShape();

                                objsR.forEach(function(objR) {
                                    var positions = objR.geometry.attributes.position.array;

                                    for (var i = 0; i < positions.length; i += 3) {
                                        var x = positions[i];
                                        var y = positions[i + 1];
                                        var z = positions[i + 2];

                                        var v = new Ammo.btVector3(x, y, z);

                                        geometry.addPoint(v);

                                        Ammo.destroy(v);
                                    }
                                });

                            } else {

                                var triIdxVertArray = new Ammo.btTriangleMesh();

                                objsR.forEach(function(objR) {
                                    var positions = objR.geometry.attributes.position.array;
                                    var indices = objR.geometry.index.array;

                                    for (var i = 0; i < indices.length; i += 3) {

                                        var i1 = indices[i];
                                        var i2 = indices[i + 1];
                                        var i3 = indices[i + 2];

                                        var v1 = new Ammo.btVector3(positions[3 * i1], positions[3 * i1 + 1], positions[3 * i1 + 2]);
                                        var v2 = new Ammo.btVector3(positions[3 * i2], positions[3 * i2 + 1], positions[3 * i2 + 2]);
                                        var v3 = new Ammo.btVector3(positions[3 * i3], positions[3 * i3 + 1], positions[3 * i3 + 2]);

                                        triIdxVertArray.addTriangle(v1, v2, v3, false);
                                        Ammo.destroy(v1);
                                        Ammo.destroy(v2);
                                        Ammo.destroy(v3);
                                    }
                                });
                                var geometry = new Ammo.btBvhTriangleMeshShape(triIdxVertArray, true);
                            }

                            break;
                        case 'EMPTY':
                            var geometry = new Ammo.btEmptyShape();
                            break;
                    }

                    var pos = obj.getWorldPosition(_pGlob.vec3Tmp);
                    var quat = obj.getWorldQuaternion(_pGlob.quatTmp);

                    var transform = new Ammo.btTransform();
                    transform.setIdentity();
                    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
                    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
                    var motionState = new Ammo.btDefaultMotionState(transform);

                    if (type == 'STATIC' || type == 'KINEMATIC' || type == 'GHOST')
                        var bodyMass = 0;
                    else
                        var bodyMass = mass;

                    var localInertia = new Ammo.btVector3(0, 0, 0);
                    geometry.calculateLocalInertia(bodyMass, localInertia);

                    var rbInfo = new Ammo.btRigidBodyConstructionInfo(bodyMass, motionState, geometry, localInertia);
                    var body = new Ammo.btRigidBody(rbInfo);
                    // CF_STATIC_OBJECT is set automatically
                    if (type == 'KINEMATIC' || type == 'GHOST') {
                        body.setCollisionFlags(body.getCollisionFlags() | CF_KINEMATIC_OBJECT);
                        body.setActivationState(DISABLE_DEACTIVATION);
                    }

                    if (type == 'GHOST') {

                        body.setCollisionFlags(body.getCollisionFlags() | CF_NO_CONTACT_RESPONSE);
                        _pGlob.world.addRigidBody(body, SensorTrigger, AllFilter);

                    } else {

                        _pGlob.world.addRigidBody(body);

                    }


                    //body.setDamping(0.1, 0.1);

                    _pGlob.syncList.push({
                        obj: obj,
                        body: body,
                        type: type,
                        simulated: true,
                        mass: mass
                    });

                    // external physics interface
                    if (v3d.PL) {
                        v3d.PL.physics.bodies[objName] = body;
                    }
                });


            }
            createPhysicsBody('DYNAMIC', 'Collision_Body', 'CAPSULE', 1);
            createPhysicsBody('STATIC', 'Collision_Ground', 'MESH', 0);
            // loadVideo puzzle
            function loadVideo(url) {
                var elems = _pGlob.mediaElements;
                if (!(url in elems)) {
                    elems[url] = new MediaHTML5().load(url, true);
                }
                return elems[url];
            }



            // playSound puzzle
            function playSound(mediaElem, loop) {
                if (!mediaElem)
                    return;
                mediaElem.setLoop(loop);
                mediaElem.play();
            }



            // pauseSound puzzle
            function pauseSound(mediaElem) {
                if (!mediaElem)
                    return;
                mediaElem.pause();
            }

            function createJoystickey(mode, position, joysize, color) {
                createJoystick({
                    id: '0',
                    element: 'container',
                    mode: mode,
                    position: position,
                    size: joysize,
                    color: color,
                    option: {},
                    follow: true
                });


            }

            function joyEvent(fn_1, fn_2, fn_3) {
                joystickEvent('0', fn_1, fn_2, fn_3);
            }

            function removeJoy(id = '0') {
                _pGlob.joystickInfo.joystick[id].destroy();
            }

            function JoydoMoves(data) {

                var jiaodu = getObjTransform('Camera_FPS', false, 'rotation', 'z');
                if (jiaodu > 0) {
                    var hudu = -(180 - jiaodu) * 0.01745;
                } else {
                    var hudu = (jiaodu - 180) * 0.01745;
                }

                var a = vectorRotate(data.vector, hudu);


                if (cameraMoveStatus == true) {
                    var movey = getObjTransform('Camera_FPS', false, 'position', 'y');
                    var movex = getObjTransform('Camera_FPS', false, 'position', 'x');
                    setObjTransform('Camera_FPS', false, 'position', [movex - a.x / 10, movey - a.y / 10, ''], false);
                }
            }
            /**
             * 向量旋转    
             * @param {{x:Number,y:Number}} vector 
             * @param {number} angle 旋转的角度 弧度制
             * @param {*} origin  旋转点 默认是 （0,0）,可传入 绕着的某点
             */
            function vectorRotate(vector, angle, origin = { x: 0, y: 0 }) {
                let cosA = Math.cos(angle);
                let sinA = Math.sin(angle);
                var x1 = (vector.x - origin.x) * cosA - (vector.y - origin.y) * sinA;
                var y1 = (vector.x - origin.x) * sinA + (vector.y - origin.y) * cosA;
                return {
                    x: origin.x + x1,
                    y: origin.y + y1
                }
            }
            // joystick event puzzle
            function joystickEvent(id, onStartCb, onMoveCb, onEndCb) {

                const joystick = getJoystickById(id);
                console.log(joystick);

                _pGlob.joystickInfo.data[id] = {};
                joystick && joystick.on('start', function(e, data) {

                        cameraMoveStatus = false
                        onStartCb();
                    })
                    .on('move', function(e, data) {
                        console.log(data);

                        // setObjTransform('Camera_FPS', false, 'rotation', ['', '' , data.angle.degree + 90], false);

                        cameraMoveStatus = true
                        JoydoMoves(data);



                        _pGlob.joystickInfo.data[id] = data;
                        onMoveCb();
                    })
                    .on('end', function(e, data) {

                        cameraMoveStatus = false
                        onEndCb();
                    })
            }
            // create joystick puzzle
            function createJoystick(prop) {
                const joystickDiv = document.createElement('div'),
                    position = {},
                    posValue = prop.size + 'px';
                let option;

                switch (prop.element) {
                    case 'container':
                        appInstance.container.appendChild(joystickDiv);
                        break;
                    case 'body':
                        document.body.appendChild(joystickDiv);
                        break;
                };

                switch (prop.position) {
                    case "bottomLeft":
                        position.left = posValue;
                        position.bottom = posValue;
                        break;
                    case "bottomRight":
                        position.right = posValue;
                        position.bottom = posValue;
                        break;
                    case "upLeft":
                        position.left = posValue;
                        position.up = posValue;
                        break;
                    case "upRight":
                        position.right = posValue;
                        position.up = posValue;
                        break;
                };

                if (prop.mode !== "static") {
                    joystickDiv.style.position = 'absolute';
                    joystickDiv.style.top = '0px';
                    joystickDiv.style.left = '0px';
                    joystickDiv.style.width = '100%';
                    joystickDiv.style.height = '100%';
                }

                option = {
                    zone: joystickDiv,
                    mode: prop.mode,
                    position: position,
                    size: prop.size,
                    color: prop.color
                }

                Object.assign(option, prop.option);
                const joystick = nipplejs.create(option);
                joystick.id = prop.id;
                _pGlob.joystickInfo.joystick.push(joystick);
            }



            function css3dVimeoPlayerAPI(path, docb) {
                new v3d.PuzzlesLoader().loadLogic(path, function() {
                    docb();
                })
            }

            // utility function for css3d plugin
            function getCss3dByName(name) {
                return _pGlob.css3d.objs.find(item => item.name === name);
            }


            _pGlob.joystickInfo = {
                joystick: [],
                data: []
            };

            function getJoystickById(id) {
                return _pGlob.joystickInfo.joystick.find(joystick => joystick.id == id)
            }


            // everyFrame puzzle
            function registerEveryFrame(callback) {
                if (typeof callback == 'function') {
                    appInstance.renderCallbacks.push(callback);
                    if (v3d.PL.editorRenderCallbacks)
                        v3d.PL.editorRenderCallbacks.push([appInstance, callback]);
                }
            }
            // registerEveryFrame(function() {
            //     tweenCamera('', createVector(getCameraDirection(true, false)[0] * 10, getCameraDirection(true, false)[1] * 10, getCameraDirection(true,false)[2] * 10), 0, function() {}, 1);
            //   });

            // eventHTMLElem('keydown', ['DOCUMENT'], false, function(event) {
            //     if (getEventProperty('key', event) == 'w') {
            //       moveW = getObjTransform('Camera_FPS', false, 'position', 'y');
            //       setObjTransform('Camera_FPS', false, 'position', ['', moveW + 0.1, ''], false);
            //     } else if (getEventProperty('key', event) == 's') {
            //       moveS = getObjTransform('Camera_FPS', false, 'position', 'y');
            //       setObjTransform('Camera_FPS', false, 'position', ['', moveS - 0.1, ''], false);
            //     } else if (getEventProperty('key', event) == 'a') {
            //       moveA = getObjTransform('Camera_FPS', false, 'position', 'x');
            //       setObjTransform('Camera_FPS', false, 'position', [moveA - 0.1, '', ''], false);
            //     } else if (getEventProperty('key', event) == 'd') {
            //       moveD = getObjTransform('Camera_FPS', false, 'position', 'x');
            //       setObjTransform('Camera_FPS', false, 'position', [moveD + 0.1, '', ''], false);
            //     }
            //   });
        } // end of PL.init function

})(); // end of closure

/* ================================ end of code ============================= */