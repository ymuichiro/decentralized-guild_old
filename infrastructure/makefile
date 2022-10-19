TZ = JST-9
CONTAINER_NAME = ""
CONTAINER_PATH = "ghcr.io/ymuichiro/****:latest"
DB_NAME = ""
BACKUP_DIR = ./backup
CURRENT_DATE = `date +%Y%m%d`

# データベースをダンプ（実行後待ち受けになるのでパスワードを打つこと。SQL_ROOT_PASSWORDは環境変数より取得
# 0 1 * * * cd /home/admin/symbol-cloud && SQL_ROOT_PASSWORD="************" make dump && echo `TZ=JST-9 date` make dump success >> makelog.log
dump:
	@echo "------------"
	@echo "start backup"
	find ${BACKUP_DIR} -type f -name "${DB_NAME}_*.sql" -mtime +7 | xargs rm -f;
	docker exec $(CONTAINER_NAME) mysqldump -uroot -p$(SQL_ROOT_PASSWORD) --single-transaction $(DB_NAME) > ${BACKUP_DIR}/${DB_NAME}_$(CURRENT_DATE).sql
	@echo "end"


# データベースをリストア
restore:
	docker exec -i $(CONTAINER_NAME) mysql -uroot -p $(DB_NAME) < backup.sql

# command SQL_ROOT_PASSWORD="***" make frontendUpdate
frontendUpdate:
	@echo "------------"
	@echo "start container update"
	find ${BACKUP_DIR} -type f -name "${DB_NAME}_*.sql" -mtime +7 | xargs rm -f;
	docker exec $(CONTAINER_NAME) mysqldump -uroot -p$(SQL_ROOT_PASSWORD) --single-transaction $(DB_NAME) > ${BACKUP_DIR}/${DB_NAME}_$(CURRENT_DATE).sql
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)
	docker rmi $(CONTAINER_PATH)
	docker compose up -d
	@echo "end"

# （危険）全てのデータが削除されます
allDelete:
	docker compose down -v

# 保存は ctrl + s
cronedit:
	crontab -e

cronlog:
	journalctl -f -u cron