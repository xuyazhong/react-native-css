import toCamelCase from 'to-camel-case';

const wlStyle = (obj) => {
  var style = {};

  const allArray = ["display", "position", "flexDirection", "flexWrap", "justifyContent", "alignItems", "alignSelf", "alignContent", "overflow", "textAlign", "fontStyle", "color", "backgroundColor", "textShadowColor", "shadowColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "borderStyle", "fontWeight", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "top", "left", "right", "bottom", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight", "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "borderWidth", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "flex", "aspectRatio", "shadowOpacity", "shadowRadius", "scaleX", "scaleY", "translateX", "translateY", "opacity", "fontSize", "textShadowRadius", "lineHeight"];

  const numberArr = ["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "top", "left", "right", "bottom", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight", "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "borderWidth", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "flex", "aspectRatio", "shadowOpacity", "shadowRadius", "scaleX", "scaleY", "translateX", "translateY", "opacity", "fontSize", "textShadowRadius", "lineHeight"];

  for (let key in obj) {
    let v = obj[key];
    if (v === null || v === undefined || v === '') {
      delete obj[key];
      console.log("#1 delete key => ", key, "value => ", v);
      continue;
    }
    if (v === 'px') {
      delete obj[key];
      console.log("#2 delete key => ", key, "value => ", v);
      continue;
    }
    if (key.indexOf('-')) {
      let new_key = toCamelCase(key);
      obj[new_key] = v;
      delete obj[key];
      console.log("#3 delete key => ", key, "value => ", v);
      continue;
    }
    // let new_key = key.split('-')
    // if (new_key.length > 1) {
    //   let tmp = new_key[1].toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    //   let newStr = `${new_key[0]}${tmp}`;
    //   s[newStr] = s[key];
    //   delete s[key];
    // }
  }

  for (let key in obj) {
    let v = obj[key];
    if (allArray.indexOf(key) === -1) {
      delete obj[key];
      console.log("#3 delete key => ", key, "value => ", v);
      continue;
    }
    if (/.*px/.test(v)) {
      let newV = v.replace(/px$/, '');
      obj[key] = newV;
    }
    if (numberArr.indexOf(key) !== -1) {
      if (Number(obj[key])) {
        obj[key] = Number(obj[key]);
      } else {
        delete obj[key];
        continue;
      }
    }
  }
  return obj;
}
export default wlStyle;

// let result = wlStyle(`{
//   borderColor : "rgba(226,82,70,1)";
//   paddingRight : "0px";
//   borderTopColor : "rgba(226,82,70,1)";
//   borderBottomColor : "rgba(226,82,70,1)";
//   marginRight : "0px";
//   paddingBottom : "0px";
//   borderLeftWidth : "5px";
//   borderTopWidth : "5px";
//   borderWidth : "5px";
//   borderRightWidth : "5px";
//   borderRightColor : "rgba(226,82,70,1)";
//   paddingTop : "0px";
//   borderBottomWidth : "5px";
//   borderStyle : "solid";
//   borderLeftColor : "rgba(226,82,70,1)";
//   padding : "0px";
//   margin : "0px";
//   marginLeft : "0px";
//   marginBottom : "0px";
//   paddingLeft : "0px";
//   marginTop : "0px";
// }`)
// console.log('result => ', result);