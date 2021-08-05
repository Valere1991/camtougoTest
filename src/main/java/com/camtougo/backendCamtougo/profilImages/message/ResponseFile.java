package com.camtougo.backendCamtougo.profilImages.message;

public class ResponseFile {

    private String imageName;
    private String url;
    private String type;
    private long size;

    public ResponseFile(String imageName, String url, String type, long size) {
        this.imageName = imageName;
        this.url = url;
        this.type = type;
        this.size = size;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}
