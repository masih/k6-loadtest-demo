# K6 Load Test Automation Demo On K8S

This repository showcases running `k6` load tests on K8S cluster and have all metrics forwarded to a Prometheus server via Remote Write.

The load tests are set up to work with IPNI `dev` environment as part of an internal team demo.
However, you should be able to run them lon any K8S cluster given `k6-operator` is installed and Prometheus Remote Write endpoint is reachable.

## Prerequisites

* `kustomize`
* `kubectl`

## Usage

* Create a new namespace to contain the demo resources; this makes clean up easier later.
  ```shell
  kubectl create ns demo
  ```

* Run the load tests by `cd`ing into each of the subdirectories and running the following command:
  ```shell
  cd 00_simple && kustomize build . | kubectl apply -f -
  ``` 

* Load tests clean up after themselves; To delete the demo namespace, run:
  ```shell
  kubectl delete ns demo
  ```

Note `01_lookup_mhs_gen` is left as an exercise for the reader, where the container image needs to be publicly accessible for the load test to be executable, with URL to it updated in [`patch.yaml`](01_lookup_mhs_gen/patch.yaml).

## Notables

The load tests use kustomization overlays to run same tests with different parameters without duplicating config. Form example [`00_simple_affinity`](00_simple_affinity) is the same as [`00_simple`](00_simple) but with following changes:
 * parallelism is increased to 4
 * load test is to strictly run on nodes with instance type `m4.xlarge`
 * each load test is given fixed resources of `0.5` CPU and `1GiB` of memory.

Similarly, [`01_lookup_mhs_gen`](01_lookup_mhs_gen) extends [`01_lookup_mhs`](01_lookup_mhs) by overriding:
* `mhs.txt` with one that is much larger and embedded into runner docker container,
* parallelism to 7, and
* arguments to change the `--tag` value.

## Further Reading:

 - https://k6.io/blog/running-distributed-tests-on-k8s/
 - https://kubernetes.io/docs/concepts/overview/components/
 - [Installation of the K6 operator on IPNI `dev` cluster](https://github.com/ipni/storetheindex/pull/1290)
