module github.com/zeswen/web-template/apps/payment-service

go 1.21

require (
	github.com/zeswen/web-template/packages/proto v0.0.0
	google.golang.org/grpc v1.59.0
)

require (
	github.com/golang/protobuf v1.5.3 // indirect
	golang.org/x/net v0.14.0 // indirect
	golang.org/x/sys v0.11.0 // indirect
	golang.org/x/text v0.12.0 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20230822172742-b8732ec3820d // indirect
	google.golang.org/protobuf v1.32.0 // indirect
)

replace github.com/zeswen/web-template/packages/proto v0.0.0 => ../../packages/proto
