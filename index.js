import toCamelCase from 'to-camel-case';

const wlStyle = (obj) => {
  if (obj === undefined) {
    return {};
  }

  const allArray = ["display", "position", "flexDirection", "flexWrap", "justifyContent", "alignItems", "alignSelf", "alignContent", "overflow", "textAlign", "fontStyle", "color", "backgroundColor", "textShadowColor", "shadowColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "borderStyle", "fontWeight", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "top", "left", "right", "bottom", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight", "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "borderWidth", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "flex", "aspectRatio", "shadowOpacity", "shadowRadius", "scaleX", "scaleY", "translateX", "translateY", "opacity", "fontSize", "textShadowRadius", "lineHeight"];

  const numberArr = ["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "top", "left", "right", "bottom", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight", "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "borderWidth", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "flex", "aspectRatio", "shadowOpacity", "shadowRadius", "scaleX", "scaleY", "translateX", "translateY", "opacity", "fontSize", "textShadowRadius", "lineHeight"];

  for (let key in obj) {
    let v = obj[key];
    if (v === null || v === undefined || v === '') {
      delete obj[key];
      continue;
    }
    if (v === 'px') {
      delete obj[key];
      continue;
    }
    if (key.indexOf('-') !== -1) {
      let new_key = toCamelCase(key);
      obj[new_key] = v;
      delete obj[key];
      continue;
    }
  }

  for (let key in obj) {
    let v = obj[key];
    if (allArray.indexOf(key) === -1) {
      delete obj[key];
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
