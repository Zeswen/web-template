package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	"github.com/zeswen/web-template/packages/proto/payment"
	"google.golang.org/grpc"
)

type PaymentServer struct {
	payment.PaymentServiceServer
}

func (server *PaymentServer) CreatePayment(ctx context.Context, request *payment.CreatePaymentRequest) (*payment.CreatePaymentResponse, error) {
	return &payment.CreatePaymentResponse{}, nil
}

func main() {
	ln, err := net.Listen("tcp", fmt.Sprintf("localhost:%v", os.Getenv("PAYMENT_API_PORT")))
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	payment.RegisterPaymentServiceServer(grpcServer, &PaymentServer{})

	log.Printf("Server listening at %v", ln.Addr())
	if err := grpcServer.Serve(ln); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
