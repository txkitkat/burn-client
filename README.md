# burn-client
## FireMaps Dashboard - Client
Clone repo
```
cd burn-client
npm install
npm start
```

Compress Tiff
```
gdal_translate -co COMPRESS=DEFLATE -co PREDICTOR=2 burn-client/public/EVC_ca_4326.tif burn-client/public/EVC_ca_Deflate.tif
```