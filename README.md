## 参考にした記事
[https://thriveread.com/sequelize-with-typescript-and-nodejs-example/](https://thriveread.com/sequelize-with-typescript-and-nodejs-example/)

### GitHub
[https://github.com/kimkimani/Sequelize-with-Typescript](https://github.com/kimkimani/Sequelize-with-Typescript)

## DBのマイグレーション
### 1. マイグレーションファイルの作成
```shell
make migrate_create name=create_table_user
```

#### LLMにマイグレーションファイルを書かせる
```javascript
'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
```

下記モデルに合わせて、マイグレーションファイルを作成してください。

```typescript
import { Table, Column, DataType,Model} from 'sequelize-typescript';

export interface UserI {
  id: number
  email: string
  password: string
  salt: string
  userName: string
  sessionToken: string
}

@Table({
  timestamps: true ,
  tableName: "users",
  modelName: "User"
})

export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  declare id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  salt!: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  sessionToken!: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  userName!: string
}
```

## 2. マイグレーションファイルの適用
```shell
make migrate_up
```

## 3. マイグレーションファイルのロールバック
```shell
make migrate_down
```