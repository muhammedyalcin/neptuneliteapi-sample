const touch = require("sf-extension-utils/lib/touch");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const PageTitleLayout = require("components/PageTitleLayout");

const FlexLayout = require('sf-core/ui/flexlayout');
const Button = require('sf-core/ui/button');
const Label = require('sf-core/ui/label');

const extend = require("js-base/core/extend");
const System = require("sf-core/device/system");
const File = require('sf-core/io/file');

const Image = require('sf-core/ui/image');
const Animator   = require('sf-core/ui/animator');
const Color = require('sf-core/ui/color');
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
            this.imageBtn.text = "IMAGE"
        }else {
            this.imageBtn.isImage = false;
            this.imageBtn.text = "NO IMAGE"
        }
    };

    this.asyncImageBtn.onPress = () => {
        if(!this.asyncImageBtn.isPressed){
            this.asyncImageBtn.isPressed = true;
            this.asyncImageBtn.text = "ASYNC IMAGE"
        }else {
            this.asyncImageBtn.isPressed = false;
            this.asyncImageBtn.text = "NO ASYNC IMAGE"
        }
    };

    this.imageTresholdBtn.onPress = () => {
        if(!this.imageTresholdBtn.isPressed){
            this.imageTresholdBtn.isPressed = true;
            this.imageTresholdBtn.text = "THRESHOLD IMAGE"
        }else {
            this.imageTresholdBtn.isPressed = false;
            this.imageTresholdBtn.text = "NO THRESHOLD IMAGE"
        }
    };


    this.widthBtn.onPress = () => {
        if(!this.widthBtn.isPressed){
            this.widthBtn.isPressed = true;
            this.widthBtn.text = "DOUBLE WIDTH"
        }else {
            this.widthBtn.isPressed = false;
            this.widthBtn.text = "NORMAL WIDTH"
        }
    };


    this.heightBtn.onPress = () => {
        if(!this.heightBtn.isPressed){
            this.heightBtn.isPressed = true;
            this.heightBtn.text = "DOUBLE HEIGHT"
        }else {
            this.heightBtn.isPressed = false;
            this.heightBtn.text = "NORMAL HEIGHT"
        }
    };


    this.printBtn.onPress = () => {
        if(!this.printBtn.isPressed){
            this.printBtn.isPressed = true;
            this.printBtn.text = "INVERT PRINT"
        }else {
            this.printBtn.isPressed = false;
            this.printBtn.text = "NORMAL PRINT"
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
      let doubleWidth = this.widthBtn.isPressed ? true : false;
      Printer.doubleWidth = { isAscDouble : doubleWidth, isLocalDouble : doubleWidth};
      let doubleHeight = this.heightBtn.isPressed ? true : false;
      Printer.doubleHeight = { isAscDouble : doubleHeight, isLocalDouble : doubleHeight};
      Printer.invert = this.printBtn.isPressed ? true : false;
      Printer.fontSet = { asciiFontType : EFontTypeAscii.FONT_8_16 , cFontType: EFontTypeExtCode.FONT_16_16};
      Printer.spaceSet = { wordSpace: this.wordSpaceTxt.text, lineSpace: this.lineSpaceTxt.text};
      Printer.leftIndent = parseInt(this.leftIndentTxt.text);
      Printer.gray = parseInt(this.setGrayTxt.text);
      Printer.step = parseInt(this.printStepTxt.text);
      Printer.printStr = { str: this.printStringTxt.text, charset: null};
      Printer.start();
    };


    // let space = { wordSpace: 0, lineSpace: 0};

    // Printer.fontSet = { asciiFontType : EFontTypeAscii.FONT_8_16 , cFontType: EFontTypeExtCode.FONT_16_16};

    // this.starImageView.image  = Image.createFromFile("images://start.png");
    // this.starImageView.backgroundColor = Color.BLUE;

    // let touchCount = 16;
    // touch.addPressEvent(this.btnNext, () => {

    // const  { Printer , EFontTypeAscii, EFontTypeExtCode} = require("sf-plugin-neptuneliteapi");
    // Printer.init(); 
    // console.log("EFontTypeAscii " + EFontTypeAscii + " EFontTypeExtCode " + EFontTypeExtCode);
    // Printer.fontSet = { asciiFontType : EFontTypeAscii.FONT_8_16 , cFontType: EFontTypeExtCode.FONT_16_16};
   
    // Printer.spaceSet = { wordSpace: 10, lineSpace: 20}; //FAILED

    // let testImage = Image.createFromFile("images://start.png");
    // Printer.step = 3;
    // console.log("Touch Count " + touchCount);
    // switch(touchCount){
    //     case 0:
    //         ++touchCount;
    //         Printer.step = 3;
    //          break;
    //     case 1:
    //          ++touchCount;
    //         Printer.printStr  = { str: "STRTEST", charset: "CHARTEST"};
    //          break;
    //     case 2:
    //         ++touchCount;
    //         Printer.printBitmap = testImage;
    //          break;
    //     case 3:
    //         ++touchCount;
    //         Printer.printBitmapWithMonoThreshold = { image : testImage, threshold: 15};
    //          break;
    //     case 4: 
    //         ++touchCount;
    //         Printer.start();
    //         break;
    //     case 5:
    //         ++touchCount;
    //         Printer.status;
    //         break;
    //     case 6:
    //         ++touchCount;
    //         Printer.leftIndent = 15;
    //         break;
    //     case 7:
    //         ++touchCount;
    //         Printer.gray = 5;
    //         break;
    //     case 8:
    //         ++touchCount;
    //         Printer.doubleWidth = { isAscDouble : true, isLocalDouble : true};
    //         break;
    //     case 9:
    //         ++touchCount;
    //         Printer.doubleHeight = { isAscDouble : true, isLocalDouble : true};
    //         break;
    //     case 10:
    //         ++touchCount;
    //         Printer.invert = true;
    //         break;
    //     case 11:
    //         ++touchCount;
    //         Printer.cutPaper = 5;
    //         break;
    //     case 12:
    //         ++touchCount;
    //          Printer.print(testImage).then( () => {
    //              console.log("Prmisses completed");
    //          }).catch( e => {
    //                console.log("Prmisses ERROR " + e);
    //          });
    //         break;
    //     case 13:
    //         ++touchCount;
    //        Printer.printWithThreshold(testImage, 15).then( () => {
    //            console.log("Prmisses completed with TReaSHODL");
    //         }).catch( e => {
    //           console.log("Prmisses ERROR TReaSHODL" + e);
    //         });
    //         break;
    //     case 14:
    //         ++touchCount;
    //         Printer.cutMode;
    //         break;
    //     case 15:
    //         ++touchCount;
    //         Printer.dotLine;
    //         break;
    //     case 16:
    //         ++touchCount;
    //          var fontFile = new File({
    //               path: 'assets://SFProText-Medium.ttf'
    //            });
    //         Printer.fontPath = fontFile.fullPath;
    //         break;
    // }
    // });
    
    if (System.OS === "Android") {
        this.headerBar.title = "";
    }
}

module.exports = Page1;
