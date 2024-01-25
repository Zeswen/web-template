module github.com/zeswen/web-template/apps/payment-service

go 1.21

require (
	github.com/zeswen/web-template/packages/proto v0.0.0
	google.golang.org/grpc v1.60.1
)

require (
	github.com/golang/protobuf v1.5.3 // indirect
	golang.org/x/net v0.17.0 // indirect
	golang.org/x/sys v0.13.0 // indirect
	golang.org/x/text v0.13.0 // indirect
	google.golang.org/genproto v0.0.0-20240116215550-a9fa1716bcac // indirect
	google.golang.org/genproto/googleapis/api v0.0.0-20240123012728-ef4313101c80 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20240116215550-a9fa1716bcac // indirect
	google.golang.org/protobuf v1.32.0 // indirect
)

replace github.com/zeswen/web-template/packages/proto v0.0.0 => ../../packages/proto
