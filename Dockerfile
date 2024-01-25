FROM alpine:latest

RUN apk add --update git nodejs protoc

COPY . /namastay