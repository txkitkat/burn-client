import { GeoJSON } from "react-leaflet";
import borderData from "../data/California_County_Boundaries.json";

function CountyBorders(props: { counties: string[]; countyRefresh: number }) {
  const countyBorders: any = borderData;

  let map = new Map<string, string>();
  props.counties.map((s: string) => {
    const ls = s.split(/\s{2,}/);
    map.set(ls[0], ls[1]);
  });
  console.log(map);

  console.log(
    props.counties.map((s: string) => {
      const percent = s.split(/\s+/).slice(-1)[0];
      return parseFloat(percent) / 100.0;
    })
  );

  function gradient(left: string, right: string, x: number) {
    let r = byteLinear(left[1] + left[2], right[1] + right[2], x);
    let g = byteLinear(left[3] + left[4], right[3] + right[4], x);
    let b = byteLinear(left[5] + left[6], right[5] + right[6], x);
    return "#" + r + g + b;
  }

  // left, right are hex values from 00 to FF, x is real number in range 0 to 1
  function byteLinear(left: string, right: string, x: number): string {
    // @ts-ignore
    const y: number = (("0x" + left) * (1 - x) + ("0x" + right) * x) | 0;
    return y.toString(16).padStart(2, "0");
  }

  function style(feature: any) {
    return {
      fillColor: gradient("#FFFFFF", "#f7941d", 0.5),
      fillOpacity: 0.7,
    };
  }

  const onEachCounty = (county: any, layer: any) => {
    const countyName = county.properties.COUNTY_NAME;
    layer.bindPopup(countyName + ' ' + map.get(countyName));
  };

  return (
    <>
      {props.countyRefresh > 0 ? (
        <GeoJSON
          data={countyBorders.features}
          onEachFeature={onEachCounty}
          pathOptions={{ color: "black", weight: 0.75 }}
          style={style}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default CountyBorders;
