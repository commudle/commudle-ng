npm run build
cp -r dist prod-server
cd prod-server
zip -r prod-server.zip * -x "node_modules/*"
mv prod-server.zip ../
