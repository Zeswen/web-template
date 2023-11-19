module github.com/zeswen/web-template/apps/health-service

go 1.21

require github.com/zeswen/web-template/packages/proto v0.0.0

require google.golang.org/protobuf v1.31.0 // indirect

replace github.com/zeswen/web-template/packages/proto v0.0.0 => ../../packages/proto
