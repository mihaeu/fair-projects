FROM mongo

RUN    curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN    apt-get install -y make bzip2
RUN    apt-get install -y nodejs npm
RUN    apt-get install -y git-all
RUN    mkdir -p /data/db
RUN    git clone https://github.com/mihaeu/fair-projects /src
RUN    echo '{ "allow_root": true  }' > /src/.bowerrc
RUN    cd /src; npm install --unsafe-perm

EXPOSE 3000

ENTRYPOINT ["/src/start.sh"]
