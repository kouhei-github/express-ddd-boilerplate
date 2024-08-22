# Express

---

## 1. Setup
```shell
sh generate-envfile.sh
```

### 1.1 POSTGRESへ接続
```shell
psql -h localhost -p 5432 -U user -d zenmetry
```

## 2. Versionの更新
### 2.1. 更新Versionの確認
```shell
npx npm-check-updates
```

### 2.2. 更新
```shell
npx npm-check-updates -u
```

### 2.3. 更新後にInstall
```shell
npm install
```

## 3. Prismaの使用方法
### 3.1. schema.prismaからSQLファイルの作成
```shell
# npx prisma migrate dev --name create_user_auth_table
npx prisma migrate dev --name ファイル名
```

### 3.2 schema.prismaからモデルの作成
```shell
npx prisma generate
```

### 3.2.DBに反映させたい時
```shell
npm run migrate-seed
```
