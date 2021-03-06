import toCamelCase from 'to-camel-case';

const wlStyle = (style, type) => {
  if (style === undefined) {
    return {};
  }
  const obj = JSON.parse(JSON.stringify(style));

  const allArray = ["display", "position", "flexDirection", "flexWrap", "justifyContent", "alignItems", "alignSelf", "alignContent", "overflow", "textAlign", "fontStyle", "color", "backgroundColor", "textShadowColor", "shadowColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "borderStyle", "fontWeight", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "top", "left", "right", "bottom", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight", "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "borderWidth", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "flex", "aspectRatio", "shadowOpacity", "shadowRadius", "scaleX", "scaleY", "translateX", "translateY", "opacity", "fontSize", "textShadowRadius", "lineHeight", "fontFamily", "zIndex"];

  const numberArr = ["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "top", "left", "right", "bottom", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight", "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "borderWidth", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "flex", "aspectRatio", "shadowOpacity", "shadowRadius", "scaleX", "scaleY", "translateX", "translateY", "opacity", "fontSize", "textShadowRadius", "lineHeight", "zIndex"];

  for (let key in obj) {
    let v = obj[key];
    if (v === null || v === undefined || v === '') {
      delete obj[key];
      continue;
    }
    if (v === 'auto') {
      obj[key] = 0;
      continue;
    }
    if (v === 'px') {
      delete obj[key];
      continue;
    }
    if (v === '0%') {
      delete obj[key];
      continue
    }
    if (key.indexOf('-') !== -1 || key.indexOf('_') !== -1) {
      obj[toCamelCase(key)] = v;
      delete obj[key];
      continue;
    }
  }
  if (obj.hasOwnProperty('display') && obj.display === 'flex') {
    if (!obj.hasOwnProperty('flexDirection')) {
      obj.flexDirection = 'row';
    }
  }
  for (let key in obj) {
    let v = obj[key];
    if (key === 'lineHeight' && type !== 'Text') {
      delete obj[key]
      continue;
    }
    if (key === 'fontWeight') {
      obj[key] = `${v}`;
      continue;
    }
    if (key === 'position') {
      if (['absolute', 'relative'].indexOf(v) > -1) {
        continue;
      } else if (v === "fixed") {
        obj[key] = "absolute";  //fixed?????????absolute
      } else {
        delete obj[key];
      }
      continue;
    }
    if (key === 'display') {
      if (['flex', 'none'].indexOf(v) === -1) {
        delete obj[key];
      }
      continue;
    }
    if (allArray.indexOf(key) === -1) {
      delete obj[key];
      continue;
    }
    if (/.*px/.test(v)) {
      let newV = v.replace(/px$/, '');
      obj[key] = newV;
    }
    if (/^[0-9]+%$/.test(v)) {
      continue;
    }
    if (numberArr.indexOf(key) !== -1) {
      const num = Number(obj[key]);
      if (num || num === 0) {
        obj[key] = num;
      } else {
        delete obj[key];
        continue;
      }
    }
  }
  switch (type) {
    case 'Image': {
      for (const key in obj) {
        if (['borderBottomColor', 'borderBottomWidth', 'borderEndColor', 'borderLeftColor', 'borderLeftWidth', 'borderRightColor', 'borderRightWidth', 'borderStartColor', 'borderStyle', 'borderTopColor', 'borderTopWidth'].indexOf(key) !== -1) {
          delete obj[key];
        }
      }
      if (!obj['height'] && !obj['width']) {
        obj['width'] = 100;
        obj['height'] = 100;
      }
      break;
    }
  }
  return obj;
}

export default wlStyle;
