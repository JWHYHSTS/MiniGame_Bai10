(function(){
const mathEscape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function rootBodyMarkup(body){
 if(typeof document==='undefined')return `<mtext>${mathEscape(body.replace(/<[^>]*>/g,''))}</mtext>`;
 const template=document.createElement('template');template.innerHTML=body;
 const asMath=node=>{
  if(node.nodeType===Node.TEXT_NODE)return node.textContent?`<mtext>${mathEscape(node.textContent)}</mtext>`:'';
  if(node.nodeType!==Node.ELEMENT_NODE)return '';
  if(node.classList.contains('fraction'))return `<mfrac><mrow>${[...node.children[0].childNodes].map(asMath).join('')}</mrow><mrow>${[...node.children[1].childNodes].map(asMath).join('')}</mrow></mfrac>`;
  if(node.classList.contains('math')){
   const exponent=[...node.children].find(child=>child.localName==='sup');
   if(exponent)return `<msup><mrow>${[...node.childNodes].filter(child=>child!==exponent).map(asMath).join('')}</mrow><mn>${mathEscape(exponent.textContent)}</mn></msup>`;
  }
  return `<mrow>${[...node.childNodes].map(asMath).join('')}</mrow>`;
 };
 return [...template.content.childNodes].map(asMath).join('');
}
const root=(body,spoken=body.replace(/<[^>]*>/g,''))=>`<math xmlns="http://www.w3.org/1998/Math/MathML" class="cube-root" display="inline" aria-label="căn bậc ba của ${mathEscape(spoken)}"><mroot><mrow>${rootBodyMarkup(body)}</mrow><mn>3</mn></mroot></math>`;
const power=(base,n=3)=>`<span class="math">${base}<sup>${n}</sup></span>`;
const fraction=(a,b)=>`<span class="fraction math"><span>${a}</span><span>${b}</span></span>`;
const cmd=(id,text)=>({id,text});
const program=(id,title,signal,prompt,pool,order,hint,explain)=>({id,title,signal,prompt,mode:'program',pool,order,hint,explain});
const input=(id,title,signal,prompt,answer,hint,explain)=>({id,title,signal,prompt,mode:'input',answer,hint,explain});
const debug=(id,title,signal,prompt,lines,fault,fixes,fix,hint,explain)=>({id,title,signal,prompt,mode:'debug',lines,fault,fixes,fix,hint,explain});
const sectors=[
  {name:'Bệ phóng Lập Phương',short:'BỆ PHÓNG',tag:'Thể tích & căn bậc ba',description:'Viết mã đổi thể tích thành cạnh khối lập phương.',theme:'cyan',music:[262,392,330,494,392,330,294,392]},
  {name:'Vùng Cực Tính',short:'CỰC TÍNH',tag:'Số âm & phân số',description:'Giữ đúng dấu khi băng qua vùng từ trường.',theme:'violet',music:[220,262,330,294,196,262,349,294]},
  {name:'Trạm Hiệu Chuẩn',short:'HIỆU CHUẨN',tag:'Tính gần đúng',description:'Làm tròn tọa độ đến hàng phần trăm.',theme:'gold',music:[293,349,440,392,330,440,494,392]},
  {name:'Quỹ Đạo Biến Số',short:'BIẾN SỐ',tag:'Thay giá trị x',description:'Nạp tham số x vào môđun căn thức.',theme:'mint',music:[261,330,392,523,392,330,293,392]},
  {name:'Xưởng Sửa Lệnh',short:'SỬA LỆNH',tag:'Hằng đẳng thức',description:'Nhận dạng lập phương và sửa thuật toán sai.',theme:'pink',music:[247,311,370,494,370,311,277,415]},
  {name:'Cổng Sao Cuối',short:'CỔNG SAO',tag:'Tổng hợp Bài 10',description:'Ba pha để đưa phi thuyền về đích.',theme:'final',music:[196,294,392,494,392,294,262,392]}
];
const missions=[
 [
  program('A1','Tọa độ bệ phóng',`V = 1 331 cm${power('',3)}`,'Xếp ba lệnh tìm cạnh a của khối lập phương.',[
   cmd('s2',`a = ${root('1 331')}`),cmd('bad','a = 1 331³'),cmd('s3','a = 11 cm'),cmd('s1',`V = a${power('',3)}`)],['s1','s2','s3'],'Với hình lập phương: V = a³. Lấy căn bậc ba của thể tích để tìm cạnh.','11³ = 1 331 nên a = ∛1 331 = 11 cm.'),
  input('A2','Khóa tham số cạnh',`V = 2 744 cm${power('',3)}`,'Điền độ dài cạnh a (cm) vào chương trình bay.',14,'So sánh 13³, 14³ và 15³.','14³ = 2 744 nên cạnh khối lập phương là 14 cm.'),
  program('A3','Tính nhiên liệu khối',`a = 15 cm`,'Xếp lệnh tính thể tích V (cm³).',[
   cmd('s3',`V = 3 375 cm${power('',3)}`),cmd('s1',`V = a${power('',3)}`),cmd('bad',`V = 225 cm${power('',3)}`),cmd('s2',`V = 15${power('',3)}`)],['s1','s2','s3'],'Dùng công thức V = a³; 15² chỉ là bình phương.','V = 15³ = 3 375 cm³.'),
  debug('A4','Sửa bộ đo cạnh',`a = 13 cm`,'Chọn dòng bị lỗi rồi chọn lệnh thay thế.',[`a = 13 cm`,`V = a${power('',3)}`,`V = 2 196 cm${power('',3)}`],2,[cmd('x','V = 2 197 cm³'),cmd('y','V = 169 cm³'),cmd('z','V = 2 198 cm³')],'x','Kiểm tra 13³ bằng 13 · 13 · 13.','13³ = 2 197, vậy dòng V = 2 196 sai và cần thay bằng V = 2 197 cm³.')
 ],
 [
  program('B1','Cổng từ trường âm',root('−729','âm bảy trăm hai mươi chín'),'Xếp lệnh tính căn bậc ba âm.',[
   cmd('s2','(−9)³ = −729'),cmd('bad','9³ = −729'),cmd('s1','Đặt y³ = −729'),cmd('s3','y = −9')],['s1','s2','s3'],'Căn bậc ba của một số âm là số âm. Tìm số có lập phương bằng −729.','(−9)³ = −729 nên ∛(−729) = −9.'),
  input('B2','Lõi thập phân âm',root('−0,008','âm không phẩy không không tám'),'Điền giá trị căn bậc ba; có thể nhập dấu − và dấu phẩy.',-.2,'0,2³ = 0,008. Kết quả phải mang dấu nào?','(−0,2)³ = −0,008, nên kết quả là −0,2.'),
  program('B3','Ống dẫn phân số',root(fraction('−1','64'),'âm một phần sáu mươi bốn'),'Xếp lệnh điều khiển số hữu tỉ.',[
   cmd('bad','Căn bậc ba không xác định vì số âm'),cmd('s3',`y = ${fraction('−1','4')}`),cmd('s1',`y${power('',3)} = ${fraction('−1','64')}`),cmd('s2',`${power(`(${fraction('−1','4')})`)} = ${fraction('−1','64')}`)],['s1','s2','s3'],'4³ = 64. Hãy thử lập phương của phân số −1/4.','(−1/4)³ = −1/64, vậy ∛(−1/64) = −1/4.'),
  debug('B4','Robot đảo dấu',root('−343','âm ba trăm bốn mươi ba'),'Tìm dòng sai và sửa kết quả.',[`Đặt y = ${root('−343')}`,`Ta có (−7)³ = −343`,`Suy ra y = 7`],2,[cmd('x','y = −7'),cmd('y','y = 49'),cmd('z','y = 7')],'x','Lập phương của −7 vẫn âm. Dòng kết luận phải giữ dấu.','Vì (−7)³ = −343 nên ∛(−343) = −7.')
 ],
 [
  program('C1','Tọa độ 20',root('20'),'Xếp lệnh tính gần đúng, làm tròn đến hàng phần trăm.',[
   cmd('s3',`${root('20')} ≈ 2,71`),cmd('s1','2³ < 20 < 3³'),cmd('bad',`${root('20')} ≈ 2,72`),cmd('s2',`${root('20')} ≈ 2,7144…`)],['s1','s2','s3'],'Kiểm tra chữ số thứ ba sau dấu phẩy của 2,7144…','∛20 ≈ 2,7144…, làm tròn đến hàng phần trăm được 2,71.'),
  input('C2','Tọa độ 50',root('50'),'Nhập kết quả làm tròn đến hàng phần trăm.',3.68,'3³ < 50 < 4³. Giá trị gần đúng là 3,684…','∛50 ≈ 3,68403…, làm tròn đến hàng phần trăm được 3,68.'),
  program('C3','Tọa độ đối xứng',root('−30','âm ba mươi'),'Xếp lệnh, làm tròn đến hàng phần trăm.',[
   cmd('s3',`${root('−30')} ≈ −3,11`),cmd('bad',`${root('−30')} ≈ 3,11`),cmd('s1',`${root('−30')} = −${root('30')}`),cmd('s2',`${root('30')} ≈ 3,10723…`)],['s1','s2','s3'],'Số ban đầu âm; ∛30 ≈ 3,10723…','∛(−30) = −∛30 ≈ −3,10723…, làm tròn là −3,11.'),
  input('C4','Vi tọa độ',root('0,2','không phẩy hai'),'Nhập kết quả làm tròn đến hàng phần trăm.',.58,'0,5³ = 0,125 và 0,6³ = 0,216. Kết quả ở giữa 0,5 và 0,6.','∛0,2 ≈ 0,58480…, làm tròn đến hàng phần trăm là 0,58.')
 ],
 [
  program('D1','Nạp tham số x',`${root('4x + 11','bốn x cộng mười một')} <span class="given">x = 4</span>`,'Xếp lệnh thay biến và tính giá trị.',[
   cmd('bad','4 · 4 + 11 = 15'),cmd('s2',`${root('27')}`),cmd('s3','Kết quả = 3'),cmd('s1','4 · 4 + 11 = 27')],['s1','s2','s3'],'Thay x = 4 vào biểu thức dưới căn trước; 4 · 4 = 16.','4 · 4 + 11 = 27, mà 3³ = 27, nên giá trị bằng 3.'),
  input('D2','Điền lệnh giảm tốc',`${root('7x − 1','bảy x trừ một')} <span class="given">x = −9</span>`,'Nhập kết quả để phi thuyền giữ quỹ đạo.',-4,'Tính 7 · (−9) − 1; đây là số lập phương âm.','7 · (−9) − 1 = −64, vì (−4)³ = −64 nên kết quả là −4.'),
  program('D3','Bộ định vị x',`${root('x − 6','x trừ sáu')} <span class="given">x = 131</span>`,'Xếp lệnh tìm giá trị căn thức.',[
   cmd('s2',`${root('125')}`),cmd('bad',`${root('137')}`),cmd('s1','131 − 6 = 125'),cmd('s3','Kết quả = 5')],['s1','s2','s3'],'Tính biểu thức dưới căn: 131 − 6.','131 − 6 = 125 và 5³ = 125 nên căn thức bằng 5.'),
  debug('D4','Bộ biên dịch dấu',`${root('2x − 1','hai x trừ một')} <span class="given">x = −13</span>`,'Chọn dòng sai và lệnh sửa.',[`2 · (−13) − 1 = −27`,`(−3)³ = 27`,`Giá trị căn thức là −3`],1,[cmd('x','(−3)³ = −27'),cmd('y','3³ = −27'),cmd('z','(−3)² = −27')],'x','Số âm lũy thừa bậc lẻ vẫn âm.','(−3)³ = −27. Dòng thứ hai sai dấu, còn kết quả −3 là đúng.')
 ],
 [
  program('E1','Gói thuật toán tổng',`${root(power('(x + 4)'),'x cộng bốn tất cả lập phương')} = ?`,'Xếp ba lệnh rút gọn biểu thức.',[
   cmd('s2',`Biểu thức có dạng ${root(power('a'),'a lập phương')}`),cmd('bad','Lấy giá trị tuyệt đối của x + 4'),cmd('s1','Đặt a = x + 4'),cmd('s3',`Vì ${root(power('a'),'a lập phương')} = a, kết quả là x + 4`)],['s1','s2','s3'],'Với mọi a thực, ∛(a³) = a. Không cần giá trị tuyệt đối.','Đặt a = x + 4, suy ra ∛((x + 4)³) = x + 4 với mọi x.'),
  debug('E2','Lỗi trị tuyệt đối',`${root(`27${power('x')}`,'hai mươi bảy x lập phương')} = ?`,'Tìm lệnh sai và thay cho đúng.',[`27x³ = (3x)³`,`∛((3x)³) = |3x|`,`Dòng 2 là lệnh robot sẽ gửi đến bộ lái`],1,[cmd('x','∛((3x)³) = 3x'),cmd('y','∛((3x)³) = 9x'),cmd('z','∛((3x)³) = −3x')],'x','Đặt a = 3x. Căn bậc ba của a³ bằng a, kể cả a âm.','∛(27x³) = ∛((3x)³) = 3x, không lấy giá trị tuyệt đối.'),
  program('E3','Giải mã đa thức',`${root(`${power('x')} − 6${power('x',2)} + 12x − 8`,'x lập phương trừ sáu x bình phương cộng mười hai x trừ tám')} = ?`,'Xếp các bước nhận dạng lập phương của hiệu.',[
   cmd('s3','Kết quả = x − 2'),cmd('s1','x³ − 6x² + 12x − 8 = (x − 2)³'),cmd('bad','x³ − 6x² + 12x − 8 = (x + 2)³'),cmd('s2',`${root(power('(x − 2)'),'x trừ hai tất cả lập phương')} = x − 2`)],['s1','s2','s3'],'So sánh với (a − b)³ = a³ − 3a²b + 3ab² − b³.','Đa thức là (x − 2)³ nên căn bậc ba bằng x − 2.'),
  debug('E4','Nghiệm thu robot',`${root(`${power('x')} + 9${power('x',2)} + 27x + 27`,'x lập phương cộng chín x bình phương cộng hai mươi bảy x cộng hai mươi bảy')} = ?`,'Chọn dòng tính sai rồi sửa.',[`x³ + 9x² + 27x + 27 = (x + 3)³`,`∛((x + 3)³) = x + 3`,`Kết quả của robot: x − 3`],2,[cmd('x','Kết quả: x + 3'),cmd('y','Kết quả: |x − 3|'),cmd('z','Kết quả: (x + 3)³')],'x','Phần trong dấu căn là (x + 3)³. Giữ nguyên x + 3.','∛((x + 3)³) = x + 3; dòng kết luận x − 3 bị sai.')
 ],
 [
  program('F1','Pha 1 · Nạp nhiên liệu',`V = 4 913 cm${power('',3)}`,'Xếp ba lệnh tìm cạnh khối lập phương.',[
   cmd('s3','a = 17 cm'),cmd('bad','a = 4 913 cm'),cmd('s2',`a = ${root('4 913')}`),cmd('s1',`V = a${power('',3)}`)],['s1','s2','s3'],'Tìm số có lập phương bằng 4 913.','17³ = 4 913, nên cạnh bằng 17 cm.'),
  input('F2','Pha 2 · Lái quỹ đạo',`${root('5x − 7','năm x trừ bảy')} <span class="given">x = −4</span>`,'Nhập kết quả để mở cổng sao.',-3,'Thay x = −4: 5 · (−4) − 7 là số lập phương âm.','5 · (−4) − 7 = −27, vậy căn bậc ba là −3.'),
  debug('F3','Pha 3 · Kiểm định cuối',`${root(`${power('x')} − 12${power('x',2)} + 48x − 64`,'x lập phương trừ mười hai x bình phương cộng bốn mươi tám x trừ sáu mươi bốn')} = ?`,'Chọn dòng sai và bản sửa cuối cùng.',[`x³ − 12x² + 48x − 64 = (x − 4)³`,`∛((x − 4)³) = |x − 4|`,`Dòng 2 chuẩn bị được gửi đến cổng sao`],1,[cmd('x','∛((x − 4)³) = x − 4'),cmd('y','∛((x − 4)³) = 4 − x'),cmd('z','∛((x − 4)³) = x³ − 4')],'x','Căn bậc ba của a³ bằng a với mọi a thực.','∛((x − 4)³) = x − 4 với mọi x. Lệnh ở dòng hai dùng trị tuyệt đối là sai.')
 ]
];
window.StarcodeData={root,power,fraction,sectors,missions,allMissions:missions.flat()};
})();
