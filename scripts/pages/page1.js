const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const PageTitleLayout = require("components/PageTitleLayout");

const extend = require("js-base/core/extend");
const System = require("sf-core/device/system");

const Image = require('sf-core/ui/image');
const AlertView = require('sf-core/ui/alertview');


// Get generated UI code
const Page1Design = require("ui/ui_page1");

const Page1 = extend(Page1Design)(
    // Constructor
    function(_super, routeData, router) {
        // Initalizes super class for this page scope
        _super(this);
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        
    });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
    this.headerBar.titleLayout.applyLayout();
}
/**
 * 
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad(); 
    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, "titleLayout");

    const  { Printer , EFontTypeAscii, EFontTypeExtCode} = require("sf-plugin-neptuneliteapi");

    let testImage = Image.createFromFile("images://start.png");

    this.imageBtn.isImage = false;
    this.imageBtn.onPress = () => {
        if(!this.imageBtn.isImage){
            this.imageBtn.isImage = true;
            this.imageBtn.text = "IMAGE";
        }else {
            this.imageBtn.isImage = false;
            this.imageBtn.text = "NO IMAGE";
        }
    };

    this.asyncImageBtn.onPress = () => {
        if(!this.asyncImageBtn.isPressed){
            this.asyncImageBtn.isPressed = true;
            this.asyncImageBtn.text = "ASYNC IMAGE";
        }else {
            this.asyncImageBtn.isPressed = false;
            this.asyncImageBtn.text = "NO ASYNC IMAGE";
        }
    };

    this.imageTresholdBtn.onPress = () => {
        if(!this.imageTresholdBtn.isPressed){
            this.imageTresholdBtn.isPressed = true;
            this.imageTresholdBtn.text = "THRESHOLD IMAGE";
        }else {
            this.imageTresholdBtn.isPressed = false;
            this.imageTresholdBtn.text = "NO THRESHOLD IMAGE";
        }
    };


    this.widthBtn.onPress = () => {
        if(!this.widthBtn.isPressed){
            this.widthBtn.isPressed = true;
            this.widthBtn.text = "DOUBLE WIDTH";
        }else {
            this.widthBtn.isPressed = false;
            this.widthBtn.text = "NORMAL WIDTH";
        }
    };


    this.heightBtn.onPress = () => {
        if(!this.heightBtn.isPressed){
            this.heightBtn.isPressed = true;
            this.heightBtn.text = "DOUBLE HEIGHT";
        }else {
            this.heightBtn.isPressed = false;
            this.heightBtn.text = "NORMAL HEIGHT";
        }
    };


    this.printBtn.onPress = () => {
        if(!this.printBtn.isPressed){
            this.printBtn.isPressed = true;
            this.printBtn.text = "INVERT PRINT";
        }else {
            this.printBtn.isPressed = false;
            this.printBtn.text = "NORMAL PRINT";
        }
    };
    

    this.getStatusBtn.onPress = () => {
      let myAlertView = new AlertView({
         title: "Status",
         message: "Status is " + Printer.status
       });

       myAlertView.show();
    };


    this.getDotLineBtn.onPress = () => {
      let myAlertView = new AlertView({
         title: "Dot Line",
         message: "Dot line is " + Printer.dotLine
       });

       myAlertView.show();
    };

    this.startBtn.onPress = () => {
      Printer.init();
      if(this.imageBtn.isImage){
          if(this.imageTresholdBtn.isPressed)
            Printer.printBitmapWithMonoThreshold = { image : testImage, threshold: 15};
            else if(this.asyncImageBtn.isPressed) {
                Printer.print(testImage).then( () => {
                 console.log("Prmisses completed");
                }).catch( e => {
                  console.log("Prmisses ERROR " + e);
                });
            }else 
            Printer.printBitmap = testImage;
      }
      Printer.fontSet = { asciiFontType : EFontTypeAscii.FONT_8_16 , cFontType: EFontTypeExtCode.FONT_16_16};
      let doubleWidth = this.widthBtn.isPressed ? true : false;
      Printer.doubleWidth = { isAscDouble : doubleWidth, isLocalDouble : doubleWidth};
      let doubleHeight = this.heightBtn.isPressed ? true : false;
      Printer.doubleHeight = { isAscDouble : doubleHeight, isLocalDouble : doubleHeight};
      Printer.invert = this.printBtn.isPressed ? true : false;
      Printer.spaceSet = { wordSpace: parseInt(this.wordSpaceTxt.text.trim()), lineSpace: parseInt(this.lineSpaceTxt.text.trim())};
      Printer.leftIndent = parseInt(this.leftIndentTxt.text);
      Printer.gray = parseInt(this.setGrayTxt.text);
      Printer.step = parseInt(this.printStepTxt.text.trim());
      Printer.printStr = { str: this.printStringTxt.text, charset: null};
      Printer.start();
    };
    
    if (System.OS === "Android") {
        this.headerBar.title = "";
    }
}

module.exports = Page1;