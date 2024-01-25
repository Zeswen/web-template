FROM alpine:latest

# Alpine Package Keeper
RUN apk add --update git nodejs unzip g++ make postgresql

# PostgreSQL
RUN mkdir /run/postgresql
RUN chown postgres:postgres /run/postgresql/
RUN su postgres -c "mkdir /var/lib/postgresql/data"
RUN su postgres -c "chmod 0700 /var/lib/postgresql/data"
RUN su postgres -c "initdb -D /var/lib/postgresql/data"
RUN su postgres -c "createdb product"
RUN echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf
RUN echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf
RUN su postgres -c 'pg_ctl start -D /var/lib/postgresql/data'

# Protocol Buffer Compiler
RUN wget -q https://github.com/protocolbuffers/protobuf/releases/download/v25.2/protoc-25.2-linux-x86_64.zip
RUN unzip protoc-25.2-linux-x86_64.zip -d $HOME/.local
RUN rm protoc-25.2-linux-x86_64.zip
ENV PATH=$PATH:/root/.local/bin

# Golang
RUN wget -qO- https://go.dev/dl/go1.21.6.linux-amd64.tar.gz | tar -C /usr/local -xzf -
ENV PATH=$PATH:/usr/local/go/bin:/root/go/bin
RUN go install github.com/google/gnostic/cmd/protoc-gen-openapi@latest
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# Rust
RUN wget -O- https://static.rust-lang.org/rustup/rustup-init.sh | sh -s - -y
ENV PATH=$PATH:/root/.cargo/bin

# pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PATH:$PNPM_HOME

# Repository
RUN git clone https://github.com/Zeswen/web-template.git $HOME/web-template
RUN pnpm add --global nx@latest
WORKDIR /root/web-template
RUN pnpm install
RUN nx run-many -t build -p @zeswen/db @zeswen/proto
RUN nx run @zeswen/db:migrate
# Reset NX cache to avoid permission issues
RUN nx reset

COPY .env /root/web-template/.env

EXPOSE 3000
EXPOSE 5432
EXPOSE 50051
EXPOSE 50052
EXPOSE 50053

VOLUME “/sys/fs/cgroup”

ENTRYPOINT su postgres -c 'pg_ctl start -D /var/lib/postgresql/data' && sh