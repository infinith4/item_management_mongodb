item_management
==============

Node.jsでMongoDB+Mongoose+Socket.IOを使用したWebアプリ。

データベースにMongoDBを使用しているのでインストールして、
appの実行の前にmongodを起動しておく必要があります。


=============================
install Mongodb on Ubuntu15.10
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo apt-get install -y mongodb-org=3.0.8 mongodb-org-server=3.0.8 mongodb-org-shell=3.0.8 mongodb-org-mongos=3.0.8 mongodb-org-tools=3.0.8
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
sudo service mongod start
/var/lib/mongodb/
sudo apt-get autoremove
sudo apt-get purge mongodb-org
sudo apt-get autoremove
sudo rm /etc/apt/sources.list.d/mongodb.list
echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start
mongo --version
sudo service mongod start
sudo  apt-get install mongodb-org=3.0.0 mongodb-org-server=3.0.0 mongodb-org-shell=3.0.0 mongodb-org-mongos=3.0.0 mongodb-org-tools=3.0.0
sudo apt-get install upstart-sysv
sudo service mongod start
