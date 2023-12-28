#!/bin/bash

#备份正式服务器上的前端dist包，然后替换成测试服务器上的dist包
status_message() {
    local color="${2:-32}"
    echo -e "\e[${color}m===$1===\e[0m"
}

npm run build 

status_message "开始备份测试服务器dist包"
ssh root@8.217.183.82 "
current_time=$(date +\"%m-%d-%H-%M\");
mv /fim/benewake/dist /fim/benewake/dist_\$current_time
"

if [ $? -eq 0 ]; then
    status_message "备份完成"
else
    status_message "备份失败" 31
fi

status_message "开始更新测试服务器dist包"
scp -r ~/Documents/Codes/FIM-benewake/dist root@8.217.183.82:/fim/benewake

if [ $? -eq 0 ]; then
    status_message "更新完成"
else
    status_message "更新失败" 31
fi