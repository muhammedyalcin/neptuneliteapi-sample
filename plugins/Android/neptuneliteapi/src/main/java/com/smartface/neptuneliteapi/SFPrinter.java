package com.smartface.neptuneliteapi;


import android.graphics.Bitmap;

import com.pax.dal.IPrinter;
import com.pax.dal.entity.EFontTypeAscii;
import com.pax.dal.entity.EFontTypeExtCode;
import com.pax.dal.exceptions.PrinterDevException;

public class SFPrinter {

    private final IPrinter printer;

    public SFPrinter(IPrinter printer){
        this.printer = printer;
    }

    public void init() throws PrinterDevException {
        printer.init();
    }

    public void fontSet(EFontTypeAscii eFontTypeAscii, EFontTypeExtCode eFontTypeExtCode) throws PrinterDevException {
        printer.fontSet(eFontTypeAscii, eFontTypeExtCode);
    }

    public void spaceSet(int b, int b1) throws PrinterDevException {
        printer.spaceSet((byte)b, (byte)b1);
    }

    public void step(int i) throws PrinterDevException {
        printer.step(i);
    }

    public void printStr(String s, String s1) throws PrinterDevException {
        printer.printStr(s, s1);
    }

    public void printBitmap(Bitmap bitmap) throws PrinterDevException {
        printer.printBitmap(bitmap);
    }

    public void printBitmapWithMonoThreshold(Bitmap bitmap, int i) throws PrinterDevException {
        printer.printBitmapWithMonoThreshold(bitmap, i);
    }

    public int start() throws PrinterDevException {
        return printer.start();
    }

    public int getStatus() throws PrinterDevException {
        return printer.getStatus();
    }

    public void leftIndent(int i) throws PrinterDevException {
        printer.leftIndent(i);
    }

    public int getDotLine() throws PrinterDevException {
        return printer.getDotLine();
    }

    public void setGray(int i) throws PrinterDevException {
        printer.setGray(i);
    }

    public void doubleWidth(boolean b, boolean b1) throws PrinterDevException {
        printer.doubleWidth(b, b1);
    }

    public void doubleHeight(boolean b, boolean b1) throws PrinterDevException {
        printer.doubleHeight(b, b1);
    }

    public void invert(boolean b) throws PrinterDevException {
        printer.invert(b);
    }

    public void cutPaper(int i) throws PrinterDevException {
        printer.cutPaper(i);
    }

    public int getCutMode() throws PrinterDevException {
        return printer.getCutMode();
    }

    public void print(Bitmap bitmap, IPrinter.IPinterListener iPinterListener) {
        printer.print(bitmap, iPinterListener);
    }

    public void print(Bitmap bitmap, int i, IPrinter.IPinterListener iPinterListener) {
        printer.print(bitmap, i, iPinterListener);
    }

    public void setFontPath(String s) throws PrinterDevException {
        printer.setFontPath(s);
    }
}
