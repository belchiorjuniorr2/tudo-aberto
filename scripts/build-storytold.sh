#!/usr/bin/env bash
source ~/.cargo/env; unset NO_COLOR; export CARGO_BUILD_JOBS=4
cd /workspace/storytold-work; mkdir -p out logs
for r in "$@"; do
 ( cd $r
   tt=$(ls apps/*-web-boot/Trunk.toml apps/*-web/Trunk.toml 2>/dev/null | head -1)
   if [ -n "$tt" ]; then
     d=$(dirname $tt); prof=$(grep -o 'cargo-profile [a-z-]*' $tt | head -1 | awk '{print $2}')
     (cd $d && trunk build --release ${prof:+--cargo-profile $prof}) || exit 1
     dist=$(cd $d && realpath $(sed -n 's/^dist *= *"\(.*\)"/\1/p' Trunk.toml))
   else
     v=$(sed -n 's/^const WASM_BINDGEN: &str = "\(.*\)";$/\1/p' xtask/src/main.rs)
     command -v wasm-bindgen >/dev/null && wasm-bindgen --version | grep -qF "$v" || cargo install -q wasm-bindgen-cli --version "$v" --locked || exit 1
     cargo xtask web || exit 1
     dist=$(realpath ${CARGO_TARGET_DIR:-target}/web/dist)
   fi
   rm -rf ../out/$r; cp -r "$dist" ../out/$r ) > logs/$r.log 2>&1 && echo "OK $r" || echo "FALHOU $r"
done
