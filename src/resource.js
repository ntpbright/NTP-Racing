var res = {
    HelloWorld_png : "res/HelloWorld.png",
    BG_Front_png : 'res/images/bgFront.png',
    Button_pressAny_bf_png : "res/images/pressAnyButton_before.png",
    Button_pressAny_af_png : "res/images/pressAnyButton_after.png",
    Button_arrowLeft_bf_png : "res/images/arrow_black_left.png",
    Button_arrowLeft_af_png : "res/images/arrow_black_left_invert.png",
    Button_arrowRight_bf_png : "res/images/arrow_black_right.png",
    Button_arrowRight_af_png : "res/images/arrow_black_right_invert.png",
    Button_restart_png : "res/images/restart.png",
    Button_restart_invert_png : "res/images/restart_invert.png",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
