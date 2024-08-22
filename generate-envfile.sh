#!/bin/bash

# PostgreSQLで使用可能な安全なパスワードを生成する関数
generate_postgres_password() {
    # 使用可能な文字セット（問題のある特殊文字を除外）
    chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    # パスワードの長さ (50文字)
    length=50

    # OS X互換の方法でランダムなパスワードを生成
    password=$(LC_ALL=C tr -dc "$chars" < /dev/urandom | head -c "$length")

    echo "$password"
}

# 環境変数ファイルのパス
env_file=".env"

# パスワードを生成
user_pass=$(generate_postgres_password)
secret=$(generate_postgres_password)
jwt_secret=$(generate_postgres_password)


# envファイルの内容を作成
cat > "$env_file" << EOF
DATABASE="marketing-ai"
USERNAME="user"
USER_PASS="$user_pass"
SECRET_KEY="$secret"
JWT_SECRET_KEY="$jwt_secret"
DATABASE_URL="postgresql://user:$user_pass@db:5432/zenmetry?schema=public"
EOF

echo "環境変数ファイル $env_file が作成されました。"
echo "生成されたUSER_PASSは: $user_pass"