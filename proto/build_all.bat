@echo on
@title Build proto files

for %%i in (*.proto) do protoc --proto_path=. --java_out=../pik-core/src/main/java  ./%%i

pause