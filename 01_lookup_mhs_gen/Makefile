# There is nothing special about this provider; it's just the first active one i came across.
PROVIDER_MADDR='/ip4/104.5.59.88/tcp/24001/p2p/12D3KooWRTsCNvyZr6zWvN2YtKuygfTyG5TqZfZ464472D4ZCqYd'
OUT_FILE='mhs.txt'
LATEST_AD_ENTRIES=$(shell provider ls ad -p $(PROVIDER_MADDR) -e | \
  sed -n '/Entries:/,/  ---------------------/p' | \
  sed '1d;$$d' | \
  sed 's/^ *//' \
    >$(OUT_FILE))

.PHONY: generate-mhs
generate-mhs:
	$(info Getting latest ad entries from $(PROVIDER_MADDR)...)
	$(LATEST_AD_ENTRIES)
	$(info No. of multihas entries: $(shell wc -l < $(OUT_FILE)))

.PHONY: docker-build
docker-build:
	docker build .