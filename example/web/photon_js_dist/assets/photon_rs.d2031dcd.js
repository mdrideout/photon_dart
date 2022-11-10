const __vite__wasmUrl = "/photon_js_dist/photon_rs_bg.wasm";
const __vite__initWasm = async (opts = {}, url) => {
  let result;
  if (url.startsWith("data:")) {
    const urlContent = url.replace(/^data:.*?base64,/, "");
    let bytes;
    if (typeof Buffer === "function" && typeof Buffer.from === "function") {
      bytes = Buffer.from(urlContent, "base64");
    } else if (typeof atob === "function") {
      const binaryString = atob(urlContent);
      bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
    } else {
      throw new Error("Cannot decode base64-encoded data URL");
    }
    result = await WebAssembly.instantiate(bytes, opts);
  } else {
    const response = await fetch(url);
    const contentType = response.headers.get("Content-Type") || "";
    if ("instantiateStreaming" in WebAssembly && contentType.startsWith("application/wasm")) {
      result = await WebAssembly.instantiateStreaming(response, opts);
    } else {
      const buffer = await response.arrayBuffer();
      result = await WebAssembly.instantiate(buffer, opts);
    }
  }
  return result.instance.exports;
};
const heap = new Array(32).fill(void 0);
heap.push(void 0, null, true, false);
function getObject(idx) {
  return heap[idx];
}
let heap_next = heap.length;
function dropObject(idx) {
  if (idx < 36)
    return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
function addHeapObject(obj) {
  if (heap_next === heap.length)
    heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
let WASM_VECTOR_LEN = 0;
let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(memory.buffer);
  }
  return cachegetUint8Memory0;
}
const lTextEncoder = typeof TextEncoder === "undefined" ? (0, module.require)("util").TextEncoder : TextEncoder;
let cachedTextEncoder = new lTextEncoder("utf-8");
const encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length);
    getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset2 = 0;
  for (; offset2 < len; offset2++) {
    const code = arg.charCodeAt(offset2);
    if (code > 127)
      break;
    mem[ptr + offset2] = code;
  }
  if (offset2 !== len) {
    if (offset2 !== 0) {
      arg = arg.slice(offset2);
    }
    ptr = realloc(ptr, len, len = offset2 + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset2, ptr + len);
    const ret = encodeString(arg, view);
    offset2 += ret.written;
  }
  WASM_VECTOR_LEN = offset2;
  return ptr;
}
let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(memory.buffer);
  }
  return cachegetInt32Memory0;
}
const lTextDecoder = typeof TextDecoder === "undefined" ? (0, module.require)("util").TextDecoder : TextDecoder;
let cachedTextDecoder = new lTextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
  return instance.ptr;
}
function neue$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  neue(photon_image.ptr);
}
function lix$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  lix(photon_image.ptr);
}
function ryo$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  ryo(photon_image.ptr);
}
function filter$1(img, filter_name) {
  _assertClass(img, PhotonImage);
  var ptr0 = passStringToWasm0(filter_name, __wbindgen_malloc, __wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  filter(img.ptr, ptr0, len0);
}
function lofi$1(img) {
  _assertClass(img, PhotonImage);
  lofi(img.ptr);
}
function pastel_pink$1(img) {
  _assertClass(img, PhotonImage);
  pastel_pink(img.ptr);
}
function golden$1(img) {
  _assertClass(img, PhotonImage);
  golden(img.ptr);
}
function cali$1(img) {
  _assertClass(img, PhotonImage);
  cali(img.ptr);
}
function dramatic$1(img) {
  _assertClass(img, PhotonImage);
  dramatic(img.ptr);
}
function firenze$1(img) {
  _assertClass(img, PhotonImage);
  firenze(img.ptr);
}
function obsidian$1(img) {
  _assertClass(img, PhotonImage);
  obsidian(img.ptr);
}
function noise_reduction$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  noise_reduction(photon_image.ptr);
}
function sharpen$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  sharpen(photon_image.ptr);
}
function edge_detection$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  edge_detection(photon_image.ptr);
}
function identity$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  identity(photon_image.ptr);
}
function box_blur$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  box_blur(photon_image.ptr);
}
function gaussian_blur$1(photon_image, radius) {
  _assertClass(photon_image, PhotonImage);
  gaussian_blur(photon_image.ptr, radius);
}
function detect_horizontal_lines$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  detect_horizontal_lines(photon_image.ptr);
}
function detect_vertical_lines$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  detect_vertical_lines(photon_image.ptr);
}
function detect_45_deg_lines$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  detect_45_deg_lines(photon_image.ptr);
}
function detect_135_deg_lines$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  detect_135_deg_lines(photon_image.ptr);
}
function laplace$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  laplace(photon_image.ptr);
}
function edge_one$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  edge_one(photon_image.ptr);
}
function emboss$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  emboss(photon_image.ptr);
}
function sobel_horizontal$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  sobel_horizontal(photon_image.ptr);
}
function prewitt_horizontal$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  prewitt_horizontal(photon_image.ptr);
}
function sobel_vertical$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  sobel_vertical(photon_image.ptr);
}
function crop$1(photon_image, x1, y1, x2, y2) {
  _assertClass(photon_image, PhotonImage);
  var ret = crop(photon_image.ptr, x1, y1, x2, y2);
  return PhotonImage.__wrap(ret);
}
function crop_img_browser$1(source_canvas, width, height, left, top) {
  var ret = crop_img_browser(addHeapObject(source_canvas), width, height, left, top);
  return takeObject(ret);
}
function fliph$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  fliph(photon_image.ptr);
}
function flipv$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  flipv(photon_image.ptr);
}
function resize_img_browser$1(photon_img, width, height, sampling_filter) {
  _assertClass(photon_img, PhotonImage);
  var ret = resize_img_browser(photon_img.ptr, width, height, sampling_filter);
  return takeObject(ret);
}
function resize$1(photon_img, width, height, sampling_filter) {
  _assertClass(photon_img, PhotonImage);
  var ret = resize(photon_img.ptr, width, height, sampling_filter);
  return PhotonImage.__wrap(ret);
}
function seam_carve$1(img, width, height) {
  _assertClass(img, PhotonImage);
  var ret = seam_carve(img.ptr, width, height);
  return PhotonImage.__wrap(ret);
}
function padding_uniform$1(img, padding, padding_rgba) {
  _assertClass(img, PhotonImage);
  _assertClass(padding_rgba, Rgba);
  var ptr0 = padding_rgba.ptr;
  padding_rgba.ptr = 0;
  var ret = padding_uniform(img.ptr, padding, ptr0);
  return PhotonImage.__wrap(ret);
}
function padding_left$1(img, padding, padding_rgba) {
  _assertClass(img, PhotonImage);
  _assertClass(padding_rgba, Rgba);
  var ptr0 = padding_rgba.ptr;
  padding_rgba.ptr = 0;
  var ret = padding_left(img.ptr, padding, ptr0);
  return PhotonImage.__wrap(ret);
}
function padding_right$1(img, padding, padding_rgba) {
  _assertClass(img, PhotonImage);
  _assertClass(padding_rgba, Rgba);
  var ptr0 = padding_rgba.ptr;
  padding_rgba.ptr = 0;
  var ret = padding_right(img.ptr, padding, ptr0);
  return PhotonImage.__wrap(ret);
}
function padding_top$1(img, padding, padding_rgba) {
  _assertClass(img, PhotonImage);
  _assertClass(padding_rgba, Rgba);
  var ptr0 = padding_rgba.ptr;
  padding_rgba.ptr = 0;
  var ret = padding_top(img.ptr, padding, ptr0);
  return PhotonImage.__wrap(ret);
}
function padding_bottom$1(img, padding, padding_rgba) {
  _assertClass(img, PhotonImage);
  _assertClass(padding_rgba, Rgba);
  var ptr0 = padding_rgba.ptr;
  padding_rgba.ptr = 0;
  var ret = padding_bottom(img.ptr, padding, ptr0);
  return PhotonImage.__wrap(ret);
}
function alter_channel$1(img, channel, amt) {
  _assertClass(img, PhotonImage);
  alter_channel(img.ptr, channel, amt);
}
function alter_red_channel$1(photon_image, amt) {
  _assertClass(photon_image, PhotonImage);
  alter_red_channel(photon_image.ptr, amt);
}
function alter_green_channel$1(img, amt) {
  _assertClass(img, PhotonImage);
  alter_green_channel(img.ptr, amt);
}
function alter_blue_channel$1(img, amt) {
  _assertClass(img, PhotonImage);
  alter_blue_channel(img.ptr, amt);
}
function alter_two_channels$1(img, channel1, amt1, channel2, amt2) {
  _assertClass(img, PhotonImage);
  alter_two_channels(img.ptr, channel1, amt1, channel2, amt2);
}
function alter_channels$1(img, r_amt, g_amt, b_amt) {
  _assertClass(img, PhotonImage);
  alter_channels(img.ptr, r_amt, g_amt, b_amt);
}
function remove_channel$1(img, channel, min_filter) {
  _assertClass(img, PhotonImage);
  remove_channel(img.ptr, channel, min_filter);
}
function remove_red_channel$1(img, min_filter) {
  _assertClass(img, PhotonImage);
  remove_red_channel(img.ptr, min_filter);
}
function remove_green_channel$1(img, min_filter) {
  _assertClass(img, PhotonImage);
  remove_green_channel(img.ptr, min_filter);
}
function remove_blue_channel$1(img, min_filter) {
  _assertClass(img, PhotonImage);
  remove_blue_channel(img.ptr, min_filter);
}
function swap_channels$1(img, channel1, channel2) {
  _assertClass(img, PhotonImage);
  swap_channels(img.ptr, channel1, channel2);
}
function invert$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  invert(photon_image.ptr);
}
function selective_hue_rotate$1(photon_image, ref_color, degrees) {
  _assertClass(photon_image, PhotonImage);
  _assertClass(ref_color, Rgb);
  var ptr0 = ref_color.ptr;
  ref_color.ptr = 0;
  selective_hue_rotate(photon_image.ptr, ptr0, degrees);
}
function selective_lighten$1(img, ref_color, amt) {
  _assertClass(img, PhotonImage);
  _assertClass(ref_color, Rgb);
  var ptr0 = ref_color.ptr;
  ref_color.ptr = 0;
  selective_lighten(img.ptr, ptr0, amt);
}
function selective_desaturate$1(img, ref_color, amt) {
  _assertClass(img, PhotonImage);
  _assertClass(ref_color, Rgb);
  var ptr0 = ref_color.ptr;
  ref_color.ptr = 0;
  selective_desaturate(img.ptr, ptr0, amt);
}
function selective_saturate$1(img, ref_color, amt) {
  _assertClass(img, PhotonImage);
  _assertClass(ref_color, Rgb);
  var ptr0 = ref_color.ptr;
  ref_color.ptr = 0;
  selective_saturate(img.ptr, ptr0, amt);
}
function selective_greyscale$1(photon_image, ref_color) {
  _assertClass(photon_image, PhotonImage);
  var ptr0 = photon_image.ptr;
  photon_image.ptr = 0;
  _assertClass(ref_color, Rgb);
  var ptr1 = ref_color.ptr;
  ref_color.ptr = 0;
  selective_greyscale(ptr0, ptr1);
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
function run$1() {
  run();
}
let stack_pointer = 32;
function addBorrowedObject(obj) {
  if (stack_pointer == 1)
    throw new Error("out of js stack");
  heap[--stack_pointer] = obj;
  return stack_pointer;
}
function get_image_data$1(canvas, ctx) {
  try {
    var ret = get_image_data(addBorrowedObject(canvas), addBorrowedObject(ctx));
    return takeObject(ret);
  } finally {
    heap[stack_pointer++] = void 0;
    heap[stack_pointer++] = void 0;
  }
}
function putImageData$1(canvas, ctx, new_image) {
  _assertClass(new_image, PhotonImage);
  var ptr0 = new_image.ptr;
  new_image.ptr = 0;
  putImageData(addHeapObject(canvas), addHeapObject(ctx), ptr0);
}
function open_image$1(canvas, ctx) {
  var ret = open_image(addHeapObject(canvas), addHeapObject(ctx));
  return PhotonImage.__wrap(ret);
}
function to_raw_pixels$1(imgdata) {
  try {
    const retptr = __wbindgen_export_2.value - 16;
    __wbindgen_export_2.value = retptr;
    to_raw_pixels(retptr, addHeapObject(imgdata));
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    __wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    __wbindgen_export_2.value += 16;
  }
}
function base64_to_image$1(base64) {
  var ptr0 = passStringToWasm0(base64, __wbindgen_malloc, __wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = base64_to_image(ptr0, len0);
  return PhotonImage.__wrap(ret);
}
function base64_to_vec$1(base64) {
  try {
    const retptr = __wbindgen_export_2.value - 16;
    __wbindgen_export_2.value = retptr;
    var ptr0 = passStringToWasm0(base64, __wbindgen_malloc, __wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    base64_to_vec(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    __wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    __wbindgen_export_2.value += 16;
  }
}
function to_image_data$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  var ptr0 = photon_image.ptr;
  photon_image.ptr = 0;
  var ret = to_image_data(ptr0);
  return takeObject(ret);
}
function offset$1(photon_image, channel_index, offset$12) {
  _assertClass(photon_image, PhotonImage);
  offset(photon_image.ptr, channel_index, offset$12);
}
function offset_red$1(img, offset_amt) {
  _assertClass(img, PhotonImage);
  offset_red(img.ptr, offset_amt);
}
function offset_green$1(img, offset_amt) {
  _assertClass(img, PhotonImage);
  offset_green(img.ptr, offset_amt);
}
function offset_blue$1(img, offset_amt) {
  _assertClass(img, PhotonImage);
  offset_blue(img.ptr, offset_amt);
}
function multiple_offsets$1(photon_image, offset2, channel_index, channel_index2) {
  _assertClass(photon_image, PhotonImage);
  multiple_offsets(photon_image.ptr, offset2, channel_index, channel_index2);
}
function primary$1(img) {
  _assertClass(img, PhotonImage);
  primary(img.ptr);
}
function colorize$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  colorize(photon_image.ptr);
}
function solarize$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  solarize(photon_image.ptr);
}
function solarize_retimg$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  var ret = solarize_retimg(photon_image.ptr);
  return PhotonImage.__wrap(ret);
}
function inc_brightness$1(photon_image, brightness) {
  _assertClass(photon_image, PhotonImage);
  inc_brightness(photon_image.ptr, brightness);
}
function adjust_contrast$1(photon_image, contrast) {
  _assertClass(photon_image, PhotonImage);
  adjust_contrast(photon_image.ptr, contrast);
}
function tint$1(photon_image, r_offset, g_offset, b_offset) {
  _assertClass(photon_image, PhotonImage);
  tint(photon_image.ptr, r_offset, g_offset, b_offset);
}
function horizontal_strips$1(photon_image, num_strips) {
  _assertClass(photon_image, PhotonImage);
  horizontal_strips(photon_image.ptr, num_strips);
}
function color_horizontal_strips$1(photon_image, num_strips, color) {
  _assertClass(photon_image, PhotonImage);
  _assertClass(color, Rgb);
  var ptr0 = color.ptr;
  color.ptr = 0;
  color_horizontal_strips(photon_image.ptr, num_strips, ptr0);
}
function vertical_strips$1(photon_image, num_strips) {
  _assertClass(photon_image, PhotonImage);
  vertical_strips(photon_image.ptr, num_strips);
}
function color_vertical_strips$1(photon_image, num_strips, color) {
  _assertClass(photon_image, PhotonImage);
  _assertClass(color, Rgb);
  var ptr0 = color.ptr;
  color.ptr = 0;
  color_vertical_strips(photon_image.ptr, num_strips, ptr0);
}
function oil$1(photon_image, radius, intensity) {
  _assertClass(photon_image, PhotonImage);
  oil(photon_image.ptr, radius, intensity);
}
function frosted_glass$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  frosted_glass(photon_image.ptr);
}
function monochrome$1(img, r_offset, g_offset, b_offset) {
  _assertClass(img, PhotonImage);
  monochrome(img.ptr, r_offset, g_offset, b_offset);
}
function sepia$1(img) {
  _assertClass(img, PhotonImage);
  sepia(img.ptr);
}
function grayscale$1(img) {
  _assertClass(img, PhotonImage);
  grayscale(img.ptr);
}
function grayscale_human_corrected$1(img) {
  _assertClass(img, PhotonImage);
  grayscale_human_corrected(img.ptr);
}
function desaturate$1(img) {
  _assertClass(img, PhotonImage);
  desaturate(img.ptr);
}
function decompose_min$1(img) {
  _assertClass(img, PhotonImage);
  decompose_min(img.ptr);
}
function decompose_max$1(img) {
  _assertClass(img, PhotonImage);
  decompose_max(img.ptr);
}
function grayscale_shades$1(photon_image, num_shades) {
  _assertClass(photon_image, PhotonImage);
  grayscale_shades(photon_image.ptr, num_shades);
}
function r_grayscale$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  r_grayscale(photon_image.ptr);
}
function g_grayscale$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  g_grayscale(photon_image.ptr);
}
function b_grayscale$1(photon_image) {
  _assertClass(photon_image, PhotonImage);
  b_grayscale(photon_image.ptr);
}
function single_channel_grayscale$1(photon_image, channel) {
  _assertClass(photon_image, PhotonImage);
  single_channel_grayscale(photon_image.ptr, channel);
}
function threshold$1(img, threshold$12) {
  _assertClass(img, PhotonImage);
  threshold(img.ptr, threshold$12);
}
function watermark$1(img, watermark$12, x, y) {
  _assertClass(img, PhotonImage);
  _assertClass(watermark$12, PhotonImage);
  watermark(img.ptr, watermark$12.ptr, x, y);
}
function blend$1(photon_image, photon_image2, blend_mode) {
  _assertClass(photon_image, PhotonImage);
  _assertClass(photon_image2, PhotonImage);
  var ptr0 = passStringToWasm0(blend_mode, __wbindgen_malloc, __wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  blend(photon_image.ptr, photon_image2.ptr, ptr0, len0);
}
function create_gradient$1(width, height) {
  var ret = create_gradient(width, height);
  return PhotonImage.__wrap(ret);
}
function apply_gradient$1(image) {
  _assertClass(image, PhotonImage);
  apply_gradient(image.ptr);
}
function lch$1(photon_image, mode, amt) {
  _assertClass(photon_image, PhotonImage);
  var ptr0 = passStringToWasm0(mode, __wbindgen_malloc, __wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  lch(photon_image.ptr, ptr0, len0, amt);
}
function hsl$1(photon_image, mode, amt) {
  _assertClass(photon_image, PhotonImage);
  var ptr0 = passStringToWasm0(mode, __wbindgen_malloc, __wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  hsl(photon_image.ptr, ptr0, len0, amt);
}
function hsv$1(photon_image, mode, amt) {
  _assertClass(photon_image, PhotonImage);
  var ptr0 = passStringToWasm0(mode, __wbindgen_malloc, __wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  hsv(photon_image.ptr, ptr0, len0, amt);
}
function hue_rotate_hsl$1(img, degrees) {
  _assertClass(img, PhotonImage);
  hue_rotate_hsl(img.ptr, degrees);
}
function hue_rotate_hsv$1(img, degrees) {
  _assertClass(img, PhotonImage);
  hue_rotate_hsv(img.ptr, degrees);
}
function hue_rotate_lch$1(img, degrees) {
  _assertClass(img, PhotonImage);
  hue_rotate_lch(img.ptr, degrees);
}
function saturate_hsl$1(img, level) {
  _assertClass(img, PhotonImage);
  saturate_hsl(img.ptr, level);
}
function saturate_lch$1(img, level) {
  _assertClass(img, PhotonImage);
  saturate_lch(img.ptr, level);
}
function saturate_hsv$1(img, level) {
  _assertClass(img, PhotonImage);
  saturate_hsv(img.ptr, level);
}
function lighten_lch$1(img, level) {
  _assertClass(img, PhotonImage);
  lighten_lch(img.ptr, level);
}
function lighten_hsl$1(img, level) {
  _assertClass(img, PhotonImage);
  lighten_hsl(img.ptr, level);
}
function lighten_hsv$1(img, level) {
  _assertClass(img, PhotonImage);
  lighten_hsv(img.ptr, level);
}
function darken_lch$1(img, level) {
  _assertClass(img, PhotonImage);
  darken_lch(img.ptr, level);
}
function darken_hsl$1(img, level) {
  _assertClass(img, PhotonImage);
  darken_hsl(img.ptr, level);
}
function darken_hsv$1(img, level) {
  _assertClass(img, PhotonImage);
  darken_hsv(img.ptr, level);
}
function desaturate_hsv$1(img, level) {
  _assertClass(img, PhotonImage);
  desaturate_hsv(img.ptr, level);
}
function desaturate_hsl$1(img, level) {
  _assertClass(img, PhotonImage);
  desaturate_hsl(img.ptr, level);
}
function desaturate_lch$1(img, level) {
  _assertClass(img, PhotonImage);
  desaturate_lch(img.ptr, level);
}
function mix_with_colour$1(photon_image, mix_colour, opacity) {
  _assertClass(photon_image, PhotonImage);
  _assertClass(mix_colour, Rgb);
  var ptr0 = mix_colour.ptr;
  mix_colour.ptr = 0;
  mix_with_colour(photon_image.ptr, ptr0, opacity);
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
function handleError(f) {
  return function() {
    try {
      return f.apply(this, arguments);
    } catch (e) {
      __wbindgen_exn_store(addHeapObject(e));
    }
  };
}
let cachegetUint8ClampedMemory0 = null;
function getUint8ClampedMemory0() {
  if (cachegetUint8ClampedMemory0 === null || cachegetUint8ClampedMemory0.buffer !== memory.buffer) {
    cachegetUint8ClampedMemory0 = new Uint8ClampedArray(memory.buffer);
  }
  return cachegetUint8ClampedMemory0;
}
function getClampedArrayU8FromWasm0(ptr, len) {
  return getUint8ClampedMemory0().subarray(ptr / 1, ptr / 1 + len);
}
const SamplingFilter = Object.freeze({ Nearest: 1, "1": "Nearest", Triangle: 2, "2": "Triangle", CatmullRom: 3, "3": "CatmullRom", Gaussian: 4, "4": "Gaussian", Lanczos3: 5, "5": "Lanczos3" });
class PhotonImage {
  static __wrap(ptr) {
    const obj = Object.create(PhotonImage.prototype);
    obj.ptr = ptr;
    return obj;
  }
  free() {
    const ptr = this.ptr;
    this.ptr = 0;
    __wbg_photonimage_free(ptr);
  }
  constructor(raw_pixels, width, height) {
    var ptr0 = passArray8ToWasm0(raw_pixels, __wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = photonimage_new(ptr0, len0, width, height);
    return PhotonImage.__wrap(ret);
  }
  static new_from_base64(base64) {
    var ptr0 = passStringToWasm0(base64, __wbindgen_malloc, __wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = photonimage_new_from_base64(ptr0, len0);
    return PhotonImage.__wrap(ret);
  }
  static new_from_byteslice(vec) {
    var ptr0 = passArray8ToWasm0(vec, __wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = photonimage_new_from_byteslice(ptr0, len0);
    return PhotonImage.__wrap(ret);
  }
  get_width() {
    var ret = photonimage_get_width(this.ptr);
    return ret >>> 0;
  }
  get_raw_pixels() {
    try {
      const retptr = __wbindgen_export_2.value - 16;
      __wbindgen_export_2.value = retptr;
      photonimage_get_raw_pixels(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      __wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      __wbindgen_export_2.value += 16;
    }
  }
  get_height() {
    var ret = photonimage_get_height(this.ptr);
    return ret >>> 0;
  }
  get_base64() {
    try {
      const retptr = __wbindgen_export_2.value - 16;
      __wbindgen_export_2.value = retptr;
      photonimage_get_base64(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      __wbindgen_export_2.value += 16;
      __wbindgen_free(r0, r1);
    }
  }
  get_image_data() {
    var ret = photonimage_get_image_data(this.ptr);
    return takeObject(ret);
  }
  set_imgdata(img_data) {
    photonimage_set_imgdata(this.ptr, addHeapObject(img_data));
  }
}
class Rgb {
  static __wrap(ptr) {
    const obj = Object.create(Rgb.prototype);
    obj.ptr = ptr;
    return obj;
  }
  free() {
    const ptr = this.ptr;
    this.ptr = 0;
    __wbg_rgb_free(ptr);
  }
  constructor(r, g, b) {
    var ret = rgb_new(r, g, b);
    return Rgb.__wrap(ret);
  }
  set_red(r) {
    rgb_set_red(this.ptr, r);
  }
  set_green(g) {
    rgb_set_green(this.ptr, g);
  }
  set_blue(b) {
    rgb_set_blue(this.ptr, b);
  }
  get_red() {
    var ret = rgb_get_red(this.ptr);
    return ret;
  }
  get_green() {
    var ret = rgb_get_green(this.ptr);
    return ret;
  }
  get_blue() {
    var ret = rgb_get_blue(this.ptr);
    return ret;
  }
}
class Rgba {
  static __wrap(ptr) {
    const obj = Object.create(Rgba.prototype);
    obj.ptr = ptr;
    return obj;
  }
  free() {
    const ptr = this.ptr;
    this.ptr = 0;
    __wbg_rgba_free(ptr);
  }
  constructor(r, g, b, a) {
    var ret = rgba_new(r, g, b, a);
    return Rgba.__wrap(ret);
  }
  set_red(r) {
    rgb_set_red(this.ptr, r);
  }
  set_green(g) {
    rgb_set_green(this.ptr, g);
  }
  set_blue(b) {
    rgb_set_blue(this.ptr, b);
  }
  set_alpha(a) {
    rgba_set_alpha(this.ptr, a);
  }
  get_red() {
    var ret = rgb_get_red(this.ptr);
    return ret;
  }
  get_green() {
    var ret = rgb_get_green(this.ptr);
    return ret;
  }
  get_blue() {
    var ret = rgb_get_blue(this.ptr);
    return ret;
  }
  get_alpha() {
    var ret = rgba_get_alpha(this.ptr);
    return ret;
  }
}
const __wbindgen_object_drop_ref = function(arg0) {
  takeObject(arg0);
};
const __wbg_new_59cb74e423758ede = function() {
  var ret = new Error();
  return addHeapObject(ret);
};
const __wbg_stack_558ba5917b466edd = function(arg0, arg1) {
  var ret = getObject(arg1).stack;
  var ptr0 = passStringToWasm0(ret, __wbindgen_malloc, __wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};
const __wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
  try {
    console.error(getStringFromWasm0(arg0, arg1));
  } finally {
    __wbindgen_free(arg0, arg1);
  }
};
const __wbg_instanceof_Window_adf3196bdc02b386 = function(arg0) {
  var ret = getObject(arg0) instanceof Window;
  return ret;
};
const __wbg_document_6cc8d0b87c0a99b9 = function(arg0) {
  var ret = getObject(arg0).document;
  return isLikeNone(ret) ? 0 : addHeapObject(ret);
};
const __wbg_body_8c888fe47d81765f = function(arg0) {
  var ret = getObject(arg0).body;
  return isLikeNone(ret) ? 0 : addHeapObject(ret);
};
const __wbg_createElement_5bdf88a5af9f17c5 = handleError(function(arg0, arg1, arg2) {
  var ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
  return addHeapObject(ret);
});
const __wbg_width_a85cf756c1966efd = function(arg0) {
  var ret = getObject(arg0).width;
  return ret;
};
const __wbg_height_52fa5698ae65262a = function(arg0) {
  var ret = getObject(arg0).height;
  return ret;
};
const __wbg_data_c2cd7a48734589b2 = function(arg0, arg1) {
  var ret = getObject(arg1).data;
  var ptr0 = passArray8ToWasm0(ret, __wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};
const __wbg_newwithu8clampedarrayandsh_104cc36644cfc313 = handleError(function(arg0, arg1, arg2, arg3) {
  var ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0, arg3 >>> 0);
  return addHeapObject(ret);
});
const __wbg_instanceof_CanvasRenderingContext2d_5b86ec94bce38d5b = function(arg0) {
  var ret = getObject(arg0) instanceof CanvasRenderingContext2D;
  return ret;
};
const __wbg_drawImage_1ed23ae3d5cef9bb = handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
  getObject(arg0).drawImage(getObject(arg1), arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
});
const __wbg_getImageData_888c08c04395524a = handleError(function(arg0, arg1, arg2, arg3, arg4) {
  var ret = getObject(arg0).getImageData(arg1, arg2, arg3, arg4);
  return addHeapObject(ret);
});
const __wbg_putImageData_dcb576c1e3408468 = handleError(function(arg0, arg1, arg2, arg3) {
  getObject(arg0).putImageData(getObject(arg1), arg2, arg3);
});
const __wbg_settextContent_9ac5ef9163ad40d0 = function(arg0, arg1, arg2) {
  getObject(arg0).textContent = arg1 === 0 ? void 0 : getStringFromWasm0(arg1, arg2);
};
const __wbg_appendChild_77215fd672b162c5 = handleError(function(arg0, arg1) {
  var ret = getObject(arg0).appendChild(getObject(arg1));
  return addHeapObject(ret);
});
const __wbg_instanceof_HtmlCanvasElement_4f5b5ec6cd53ccf3 = function(arg0) {
  var ret = getObject(arg0) instanceof HTMLCanvasElement;
  return ret;
};
const __wbg_width_a22f9855caa54b53 = function(arg0) {
  var ret = getObject(arg0).width;
  return ret;
};
const __wbg_setwidth_5f26a8ba9dbfa0d0 = function(arg0, arg1) {
  getObject(arg0).width = arg1 >>> 0;
};
const __wbg_height_9a404a6b3c61c7ef = function(arg0) {
  var ret = getObject(arg0).height;
  return ret;
};
const __wbg_setheight_70f62727aa9383c2 = function(arg0, arg1) {
  getObject(arg0).height = arg1 >>> 0;
};
const __wbg_getContext_37ca0870acb096d9 = handleError(function(arg0, arg1, arg2) {
  var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
  return isLikeNone(ret) ? 0 : addHeapObject(ret);
});
const __wbg_call_8e95613cc6524977 = handleError(function(arg0, arg1) {
  var ret = getObject(arg0).call(getObject(arg1));
  return addHeapObject(ret);
});
const __wbindgen_object_clone_ref = function(arg0) {
  var ret = getObject(arg0);
  return addHeapObject(ret);
};
const __wbg_newnoargs_f3b8a801d5d4b079 = function(arg0, arg1) {
  var ret = new Function(getStringFromWasm0(arg0, arg1));
  return addHeapObject(ret);
};
const __wbg_self_07b2f89e82ceb76d = handleError(function() {
  var ret = self.self;
  return addHeapObject(ret);
});
const __wbg_window_ba85d88572adc0dc = handleError(function() {
  var ret = window.window;
  return addHeapObject(ret);
});
const __wbg_globalThis_b9277fc37e201fe5 = handleError(function() {
  var ret = globalThis.globalThis;
  return addHeapObject(ret);
});
const __wbg_global_e16303fe83e1d57f = handleError(function() {
  var ret = global.global;
  return addHeapObject(ret);
});
const __wbindgen_is_undefined = function(arg0) {
  var ret = getObject(arg0) === void 0;
  return ret;
};
const __wbindgen_debug_string = function(arg0, arg1) {
  var ret = debugString(getObject(arg1));
  var ptr0 = passStringToWasm0(ret, __wbindgen_malloc, __wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};
const __wbindgen_throw = function(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
};
const __wbindgen_rethrow = function(arg0) {
  throw takeObject(arg0);
};
const __vite__wasmModule = await __vite__initWasm({ "./photon_rs_bg.js": { __wbindgen_object_drop_ref, __wbg_new_59cb74e423758ede, __wbg_stack_558ba5917b466edd, __wbg_error_4bb6c2a97407129a, __wbg_instanceof_Window_adf3196bdc02b386, __wbg_document_6cc8d0b87c0a99b9, __wbg_body_8c888fe47d81765f, __wbg_createElement_5bdf88a5af9f17c5, __wbg_width_a85cf756c1966efd, __wbg_height_52fa5698ae65262a, __wbg_data_c2cd7a48734589b2, __wbg_newwithu8clampedarrayandsh_104cc36644cfc313, __wbg_instanceof_CanvasRenderingContext2d_5b86ec94bce38d5b, __wbg_drawImage_1ed23ae3d5cef9bb, __wbg_getImageData_888c08c04395524a, __wbg_putImageData_dcb576c1e3408468, __wbg_settextContent_9ac5ef9163ad40d0, __wbg_appendChild_77215fd672b162c5, __wbg_instanceof_HtmlCanvasElement_4f5b5ec6cd53ccf3, __wbg_width_a22f9855caa54b53, __wbg_setwidth_5f26a8ba9dbfa0d0, __wbg_height_9a404a6b3c61c7ef, __wbg_setheight_70f62727aa9383c2, __wbg_getContext_37ca0870acb096d9, __wbg_call_8e95613cc6524977, __wbindgen_object_clone_ref, __wbg_newnoargs_f3b8a801d5d4b079, __wbg_self_07b2f89e82ceb76d, __wbg_window_ba85d88572adc0dc, __wbg_globalThis_b9277fc37e201fe5, __wbg_global_e16303fe83e1d57f, __wbindgen_is_undefined, __wbindgen_debug_string, __wbindgen_throw, __wbindgen_rethrow } }, __vite__wasmUrl);
const memory = __vite__wasmModule.memory;
const neue = __vite__wasmModule.neue;
const lix = __vite__wasmModule.lix;
const ryo = __vite__wasmModule.ryo;
const filter = __vite__wasmModule.filter;
const lofi = __vite__wasmModule.lofi;
const pastel_pink = __vite__wasmModule.pastel_pink;
const golden = __vite__wasmModule.golden;
const cali = __vite__wasmModule.cali;
const dramatic = __vite__wasmModule.dramatic;
const firenze = __vite__wasmModule.firenze;
const obsidian = __vite__wasmModule.obsidian;
const noise_reduction = __vite__wasmModule.noise_reduction;
const sharpen = __vite__wasmModule.sharpen;
const edge_detection = __vite__wasmModule.edge_detection;
const identity = __vite__wasmModule.identity;
const box_blur = __vite__wasmModule.box_blur;
const gaussian_blur = __vite__wasmModule.gaussian_blur;
const detect_horizontal_lines = __vite__wasmModule.detect_horizontal_lines;
const detect_vertical_lines = __vite__wasmModule.detect_vertical_lines;
const detect_45_deg_lines = __vite__wasmModule.detect_45_deg_lines;
const detect_135_deg_lines = __vite__wasmModule.detect_135_deg_lines;
const laplace = __vite__wasmModule.laplace;
const edge_one = __vite__wasmModule.edge_one;
const emboss = __vite__wasmModule.emboss;
const sobel_horizontal = __vite__wasmModule.sobel_horizontal;
const prewitt_horizontal = __vite__wasmModule.prewitt_horizontal;
const sobel_vertical = __vite__wasmModule.sobel_vertical;
const crop = __vite__wasmModule.crop;
const crop_img_browser = __vite__wasmModule.crop_img_browser;
const fliph = __vite__wasmModule.fliph;
const flipv = __vite__wasmModule.flipv;
const resize_img_browser = __vite__wasmModule.resize_img_browser;
const resize = __vite__wasmModule.resize;
const seam_carve = __vite__wasmModule.seam_carve;
const padding_uniform = __vite__wasmModule.padding_uniform;
const padding_left = __vite__wasmModule.padding_left;
const padding_right = __vite__wasmModule.padding_right;
const padding_top = __vite__wasmModule.padding_top;
const padding_bottom = __vite__wasmModule.padding_bottom;
const alter_channel = __vite__wasmModule.alter_channel;
const alter_red_channel = __vite__wasmModule.alter_red_channel;
const alter_green_channel = __vite__wasmModule.alter_green_channel;
const alter_blue_channel = __vite__wasmModule.alter_blue_channel;
const alter_two_channels = __vite__wasmModule.alter_two_channels;
const alter_channels = __vite__wasmModule.alter_channels;
const remove_channel = __vite__wasmModule.remove_channel;
const remove_red_channel = __vite__wasmModule.remove_red_channel;
const remove_green_channel = __vite__wasmModule.remove_green_channel;
const remove_blue_channel = __vite__wasmModule.remove_blue_channel;
const swap_channels = __vite__wasmModule.swap_channels;
const invert = __vite__wasmModule.invert;
const selective_hue_rotate = __vite__wasmModule.selective_hue_rotate;
const selective_lighten = __vite__wasmModule.selective_lighten;
const selective_desaturate = __vite__wasmModule.selective_desaturate;
const selective_saturate = __vite__wasmModule.selective_saturate;
const selective_greyscale = __vite__wasmModule.selective_greyscale;
const __wbg_photonimage_free = __vite__wasmModule.__wbg_photonimage_free;
const photonimage_new = __vite__wasmModule.photonimage_new;
const photonimage_new_from_base64 = __vite__wasmModule.photonimage_new_from_base64;
const photonimage_new_from_byteslice = __vite__wasmModule.photonimage_new_from_byteslice;
const photonimage_get_width = __vite__wasmModule.photonimage_get_width;
const photonimage_get_raw_pixels = __vite__wasmModule.photonimage_get_raw_pixels;
const photonimage_get_height = __vite__wasmModule.photonimage_get_height;
const photonimage_get_base64 = __vite__wasmModule.photonimage_get_base64;
const photonimage_get_image_data = __vite__wasmModule.photonimage_get_image_data;
const photonimage_set_imgdata = __vite__wasmModule.photonimage_set_imgdata;
const __wbg_rgb_free = __vite__wasmModule.__wbg_rgb_free;
const rgb_new = __vite__wasmModule.rgb_new;
const rgb_set_red = __vite__wasmModule.rgb_set_red;
const rgb_set_green = __vite__wasmModule.rgb_set_green;
const rgb_set_blue = __vite__wasmModule.rgb_set_blue;
const rgb_get_red = __vite__wasmModule.rgb_get_red;
const rgb_get_green = __vite__wasmModule.rgb_get_green;
const rgb_get_blue = __vite__wasmModule.rgb_get_blue;
const rgba_new = __vite__wasmModule.rgba_new;
const rgba_set_alpha = __vite__wasmModule.rgba_set_alpha;
const rgba_get_alpha = __vite__wasmModule.rgba_get_alpha;
const run = __vite__wasmModule.run;
const get_image_data = __vite__wasmModule.get_image_data;
const putImageData = __vite__wasmModule.putImageData;
const open_image = __vite__wasmModule.open_image;
const to_raw_pixels = __vite__wasmModule.to_raw_pixels;
const base64_to_image = __vite__wasmModule.base64_to_image;
const base64_to_vec = __vite__wasmModule.base64_to_vec;
const to_image_data = __vite__wasmModule.to_image_data;
const __wbg_rgba_free = __vite__wasmModule.__wbg_rgba_free;
__vite__wasmModule.rgba_get_red;
__vite__wasmModule.rgba_get_green;
__vite__wasmModule.rgba_get_blue;
__vite__wasmModule.rgba_set_green;
__vite__wasmModule.rgba_set_blue;
__vite__wasmModule.rgba_set_red;
const offset = __vite__wasmModule.offset;
const offset_red = __vite__wasmModule.offset_red;
const offset_green = __vite__wasmModule.offset_green;
const offset_blue = __vite__wasmModule.offset_blue;
const multiple_offsets = __vite__wasmModule.multiple_offsets;
const primary = __vite__wasmModule.primary;
const colorize = __vite__wasmModule.colorize;
const solarize = __vite__wasmModule.solarize;
const solarize_retimg = __vite__wasmModule.solarize_retimg;
const inc_brightness = __vite__wasmModule.inc_brightness;
const adjust_contrast = __vite__wasmModule.adjust_contrast;
const tint = __vite__wasmModule.tint;
const horizontal_strips = __vite__wasmModule.horizontal_strips;
const color_horizontal_strips = __vite__wasmModule.color_horizontal_strips;
const vertical_strips = __vite__wasmModule.vertical_strips;
const color_vertical_strips = __vite__wasmModule.color_vertical_strips;
const oil = __vite__wasmModule.oil;
const frosted_glass = __vite__wasmModule.frosted_glass;
const monochrome = __vite__wasmModule.monochrome;
const sepia = __vite__wasmModule.sepia;
const grayscale = __vite__wasmModule.grayscale;
const grayscale_human_corrected = __vite__wasmModule.grayscale_human_corrected;
const desaturate = __vite__wasmModule.desaturate;
const decompose_min = __vite__wasmModule.decompose_min;
const decompose_max = __vite__wasmModule.decompose_max;
const grayscale_shades = __vite__wasmModule.grayscale_shades;
const r_grayscale = __vite__wasmModule.r_grayscale;
const g_grayscale = __vite__wasmModule.g_grayscale;
const b_grayscale = __vite__wasmModule.b_grayscale;
const single_channel_grayscale = __vite__wasmModule.single_channel_grayscale;
const threshold = __vite__wasmModule.threshold;
const watermark = __vite__wasmModule.watermark;
const blend = __vite__wasmModule.blend;
const create_gradient = __vite__wasmModule.create_gradient;
const apply_gradient = __vite__wasmModule.apply_gradient;
const lch = __vite__wasmModule.lch;
const hsl = __vite__wasmModule.hsl;
const hsv = __vite__wasmModule.hsv;
const hue_rotate_hsl = __vite__wasmModule.hue_rotate_hsl;
const hue_rotate_hsv = __vite__wasmModule.hue_rotate_hsv;
const hue_rotate_lch = __vite__wasmModule.hue_rotate_lch;
const saturate_hsl = __vite__wasmModule.saturate_hsl;
const saturate_lch = __vite__wasmModule.saturate_lch;
const saturate_hsv = __vite__wasmModule.saturate_hsv;
const lighten_lch = __vite__wasmModule.lighten_lch;
const lighten_hsl = __vite__wasmModule.lighten_hsl;
const lighten_hsv = __vite__wasmModule.lighten_hsv;
const darken_lch = __vite__wasmModule.darken_lch;
const darken_hsl = __vite__wasmModule.darken_hsl;
const darken_hsv = __vite__wasmModule.darken_hsv;
const desaturate_hsv = __vite__wasmModule.desaturate_hsv;
const desaturate_hsl = __vite__wasmModule.desaturate_hsl;
const desaturate_lch = __vite__wasmModule.desaturate_lch;
const mix_with_colour = __vite__wasmModule.mix_with_colour;
const __wbindgen_malloc = __vite__wasmModule.__wbindgen_malloc;
const __wbindgen_realloc = __vite__wasmModule.__wbindgen_realloc;
const __wbindgen_export_2 = __vite__wasmModule.__wbindgen_export_2;
const __wbindgen_free = __vite__wasmModule.__wbindgen_free;
const __wbindgen_exn_store = __vite__wasmModule.__wbindgen_exn_store;
export {
  PhotonImage,
  Rgb,
  Rgba,
  SamplingFilter,
  __wbg_appendChild_77215fd672b162c5,
  __wbg_body_8c888fe47d81765f,
  __wbg_call_8e95613cc6524977,
  __wbg_createElement_5bdf88a5af9f17c5,
  __wbg_data_c2cd7a48734589b2,
  __wbg_document_6cc8d0b87c0a99b9,
  __wbg_drawImage_1ed23ae3d5cef9bb,
  __wbg_error_4bb6c2a97407129a,
  __wbg_getContext_37ca0870acb096d9,
  __wbg_getImageData_888c08c04395524a,
  __wbg_globalThis_b9277fc37e201fe5,
  __wbg_global_e16303fe83e1d57f,
  __wbg_height_52fa5698ae65262a,
  __wbg_height_9a404a6b3c61c7ef,
  __wbg_instanceof_CanvasRenderingContext2d_5b86ec94bce38d5b,
  __wbg_instanceof_HtmlCanvasElement_4f5b5ec6cd53ccf3,
  __wbg_instanceof_Window_adf3196bdc02b386,
  __wbg_new_59cb74e423758ede,
  __wbg_newnoargs_f3b8a801d5d4b079,
  __wbg_newwithu8clampedarrayandsh_104cc36644cfc313,
  __wbg_putImageData_dcb576c1e3408468,
  __wbg_self_07b2f89e82ceb76d,
  __wbg_setheight_70f62727aa9383c2,
  __wbg_settextContent_9ac5ef9163ad40d0,
  __wbg_setwidth_5f26a8ba9dbfa0d0,
  __wbg_stack_558ba5917b466edd,
  __wbg_width_a22f9855caa54b53,
  __wbg_width_a85cf756c1966efd,
  __wbg_window_ba85d88572adc0dc,
  __wbindgen_debug_string,
  __wbindgen_is_undefined,
  __wbindgen_object_clone_ref,
  __wbindgen_object_drop_ref,
  __wbindgen_rethrow,
  __wbindgen_throw,
  adjust_contrast$1 as adjust_contrast,
  alter_blue_channel$1 as alter_blue_channel,
  alter_channel$1 as alter_channel,
  alter_channels$1 as alter_channels,
  alter_green_channel$1 as alter_green_channel,
  alter_red_channel$1 as alter_red_channel,
  alter_two_channels$1 as alter_two_channels,
  apply_gradient$1 as apply_gradient,
  b_grayscale$1 as b_grayscale,
  base64_to_image$1 as base64_to_image,
  base64_to_vec$1 as base64_to_vec,
  blend$1 as blend,
  box_blur$1 as box_blur,
  cali$1 as cali,
  color_horizontal_strips$1 as color_horizontal_strips,
  color_vertical_strips$1 as color_vertical_strips,
  colorize$1 as colorize,
  create_gradient$1 as create_gradient,
  crop$1 as crop,
  crop_img_browser$1 as crop_img_browser,
  darken_hsl$1 as darken_hsl,
  darken_hsv$1 as darken_hsv,
  darken_lch$1 as darken_lch,
  decompose_max$1 as decompose_max,
  decompose_min$1 as decompose_min,
  desaturate$1 as desaturate,
  desaturate_hsl$1 as desaturate_hsl,
  desaturate_hsv$1 as desaturate_hsv,
  desaturate_lch$1 as desaturate_lch,
  detect_135_deg_lines$1 as detect_135_deg_lines,
  detect_45_deg_lines$1 as detect_45_deg_lines,
  detect_horizontal_lines$1 as detect_horizontal_lines,
  detect_vertical_lines$1 as detect_vertical_lines,
  dramatic$1 as dramatic,
  edge_detection$1 as edge_detection,
  edge_one$1 as edge_one,
  emboss$1 as emboss,
  filter$1 as filter,
  firenze$1 as firenze,
  fliph$1 as fliph,
  flipv$1 as flipv,
  frosted_glass$1 as frosted_glass,
  g_grayscale$1 as g_grayscale,
  gaussian_blur$1 as gaussian_blur,
  get_image_data$1 as get_image_data,
  golden$1 as golden,
  grayscale$1 as grayscale,
  grayscale_human_corrected$1 as grayscale_human_corrected,
  grayscale_shades$1 as grayscale_shades,
  horizontal_strips$1 as horizontal_strips,
  hsl$1 as hsl,
  hsv$1 as hsv,
  hue_rotate_hsl$1 as hue_rotate_hsl,
  hue_rotate_hsv$1 as hue_rotate_hsv,
  hue_rotate_lch$1 as hue_rotate_lch,
  identity$1 as identity,
  inc_brightness$1 as inc_brightness,
  invert$1 as invert,
  laplace$1 as laplace,
  lch$1 as lch,
  lighten_hsl$1 as lighten_hsl,
  lighten_hsv$1 as lighten_hsv,
  lighten_lch$1 as lighten_lch,
  lix$1 as lix,
  lofi$1 as lofi,
  mix_with_colour$1 as mix_with_colour,
  monochrome$1 as monochrome,
  multiple_offsets$1 as multiple_offsets,
  neue$1 as neue,
  noise_reduction$1 as noise_reduction,
  obsidian$1 as obsidian,
  offset$1 as offset,
  offset_blue$1 as offset_blue,
  offset_green$1 as offset_green,
  offset_red$1 as offset_red,
  oil$1 as oil,
  open_image$1 as open_image,
  padding_bottom$1 as padding_bottom,
  padding_left$1 as padding_left,
  padding_right$1 as padding_right,
  padding_top$1 as padding_top,
  padding_uniform$1 as padding_uniform,
  pastel_pink$1 as pastel_pink,
  prewitt_horizontal$1 as prewitt_horizontal,
  primary$1 as primary,
  putImageData$1 as putImageData,
  r_grayscale$1 as r_grayscale,
  remove_blue_channel$1 as remove_blue_channel,
  remove_channel$1 as remove_channel,
  remove_green_channel$1 as remove_green_channel,
  remove_red_channel$1 as remove_red_channel,
  resize$1 as resize,
  resize_img_browser$1 as resize_img_browser,
  run$1 as run,
  ryo$1 as ryo,
  saturate_hsl$1 as saturate_hsl,
  saturate_hsv$1 as saturate_hsv,
  saturate_lch$1 as saturate_lch,
  seam_carve$1 as seam_carve,
  selective_desaturate$1 as selective_desaturate,
  selective_greyscale$1 as selective_greyscale,
  selective_hue_rotate$1 as selective_hue_rotate,
  selective_lighten$1 as selective_lighten,
  selective_saturate$1 as selective_saturate,
  sepia$1 as sepia,
  sharpen$1 as sharpen,
  single_channel_grayscale$1 as single_channel_grayscale,
  sobel_horizontal$1 as sobel_horizontal,
  sobel_vertical$1 as sobel_vertical,
  solarize$1 as solarize,
  solarize_retimg$1 as solarize_retimg,
  swap_channels$1 as swap_channels,
  threshold$1 as threshold,
  tint$1 as tint,
  to_image_data$1 as to_image_data,
  to_raw_pixels$1 as to_raw_pixels,
  vertical_strips$1 as vertical_strips,
  watermark$1 as watermark
};
