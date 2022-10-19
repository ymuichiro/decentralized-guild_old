## 注意点

- サーバー上でコンテナのビルドを行わない事
- 別途NGINXが前面にある前提

## コンテナアップデート手順
- アップデート対象のイメージを `docker images` より確認し `docker rmi`
- `docker compose up -d` で自動アップデート

## nginx サンプル

```default
server {
          server_name cms.symbol-community.com;
          location / {
                  proxy_pass    http://localhost:1337/;
          }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/symbol-community.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/symbol-community.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
                server_name symbol-community.com;
                root /var/www/html;
                location / {
                        proxy_pass      http://localhost:3000;
                }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/symbol-community.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/symbol-community.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = symbol-community.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

                listen 80;
                server_name symbol-community.com;
                        return 404; # managed by Certbot

}
server {
    if ($host = cms.symbol-community.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

                listen 80;
                server_name cms.symbol-community.com;
                        return 404; # managed by Certbot
}
```