import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../questions.js',import.meta.url),'utf8');const context={window:{}};vm.runInNewContext(source,context);const {missions,allMissions}=context.window.StarcodeData;
assert.deepEqual(Array.from(missions,s=>s.length),[4,4,4,4,4,3]);assert.equal(new Set(allMissions.map(q=>q.id)).size,23);
const values={A2:Math.cbrt(2744),B2:Math.cbrt(-.008),C2:Math.round(Math.cbrt(50)*100)/100,C4:Math.round(Math.cbrt(.2)*100)/100,D2:Math.cbrt(7*(-9)-1),F2:Math.cbrt(5*(-4)-7)};
for(const q of allMissions){assert.ok(q.signal&&q.prompt&&q.hint&&q.explain,`${q.id}: thiếu dữ liệu`);if(q.mode==='input'){assert.ok(Math.abs(q.answer-values[q.id])<1e-9,`${q.id}: đáp án sai`)}else if(q.mode==='program'){
  const ids=q.pool.map(c=>c.id);assert.equal(q.order.length,3,`${q.id}: số lệnh`);assert.equal(new Set(ids).size,ids.length,`${q.id}: lệnh trùng`);assert.ok(q.order.every(id=>ids.includes(id)),`${q.id}: lệnh đúng không có trong bộ`);assert.ok(ids.length>3,`${q.id}: thiếu lệnh nhiễu`);
}else if(q.mode==='debug'){assert.ok(q.fault>=0&&q.fault<q.lines.length,`${q.id}: vị trí lỗi`);assert.equal(q.fixes.filter(x=>x.id===q.fix).length,1,`${q.id}: lệnh sửa`)}else throw Error(`${q.id}: kiểu nhiệm vụ lạ`)}
const eq=(a,b)=>assert.ok(Math.abs(a-b)<1e-9);
eq(11**3,1331);eq(14**3,2744);eq(15**3,3375);eq(13**3,2197);eq((-9)**3,-729);eq((-.2)**3,-.008);eq((-1/4)**3,-1/64);eq((-7)**3,-343);eq(Math.cbrt(20),2.7144176165949063);eq(Math.cbrt(-30),-3.1072325059538586);eq(4*4+11,27);eq(7*(-9)-1,-64);eq(131-6,125);eq(2*(-13)-1,-27);eq(17**3,4913);
for(const x of [-8,-2,0,1,5,11]){eq(Math.cbrt((x+4)**3),x+4);eq(Math.cbrt(27*x**3),3*x);eq(x**3-6*x**2+12*x-8,(x-2)**3);eq(x**3+9*x**2+27*x+27,(x+3)**3);eq(x**3-12*x**2+48*x-64,(x-4)**3)}
console.log('Đạt: 23 nhiệm vụ; đáp án số, lập phương, hằng đẳng thức và cấu trúc lệnh.');
