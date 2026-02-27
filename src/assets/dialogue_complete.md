# 📜 DIALOGUE SCRIPT HOÀN CHỈNH
## Game: "BÌNH MINH CHƯA ĐẾN"
### Format: [SCENE_ID] | NHÂN VẬT | BG | AVATAR | LỜI THOẠI

---
> **QUY ƯỚC FORMAT:**
> - `[SCENE_ID]` = mã định danh cảnh
> - `BG:` = background cần hiển thị
> - `CHAR:` = nhân vật
> - `TEXT:` = nội dung lời thoại
> - `[CHOICE]` = màn hình lựa chọn
> - `[NARR]` = lời dẫn chuyện (không có avatar, chữ giữa màn hình)
> - `[SFX]` = âm thanh
> - `[BGM]` = nhạc nền
---

# ══════════════════════════════
# INTRO – MÀN HÌNH TIÊU ĐỀ
# ══════════════════════════════

```
[INTRO_01]
BG: bg_black.jpg
CHAR: none
[NARR] Đông Dương, năm 1929.
[NARR] Một đất nước chìm trong bóng tối thuộc địa.
[NARR] Ba tổ chức cách mạng hoạt động riêng lẻ.
[NARR] Mỗi tổ chức một hướng. Không ai thấy đủ ánh sáng.
[NARR] Thực dân siết chặt vòng vây.
[NARR] Lịch sử đang đứng trước một ngã rẽ.
[NARR] Bạn là MINH – cán bộ trẻ vừa trở về sau hai năm học tập.
[NARR] Trong tay bạn: một tờ thư mật, một địa chỉ.
[NARR] Và một câu hỏi chưa có lời đáp:
[NARR] "Chúng ta cần làm gì bây giờ?"
[BGM: bgm_01_dark_ambient.mp3]
[SFX: sfx_rain.mp3]
```

---

# ══════════════════════════════
# MÀN 1: BÓNG TỐI CHIA RẼ
# ══════════════════════════════

## CẢNH 1.1 – Cuộc gặp mặt

```
[M1_01]
BG: bg_room_night.jpg
CHAR: none
[NARR] Hà Nội. Một căn phòng nhỏ gần phố Khâm Thiên.
[NARR] Ánh đèn dầu leo lắt. Năm người ngồi quanh chiếc bàn gỗ cũ.
[NARR] Không khí ngột ngạt – vừa nóng, vừa căng thẳng.
[BGM: bgm_01_dark_ambient.mp3]
[SFX: sfx_rain_light.mp3]
```

```
[M1_02]
BG: bg_room_night.jpg
CHAR: phung_thien_serious
NAME: Phụng Thiện
TEXT: Ba tháng qua, mười hai đồng chí bị bắt. Xưởng in bị đốt. Mạng lưới ở Sài Gòn gần như tan rã hoàn toàn.
```

```
[M1_03]
BG: bg_room_night.jpg
CHAR: phung_thien_serious
NAME: Phụng Thiện
TEXT: Các anh có thấy rõ không – đường lối hiện tại đang dẫn đến điều gì?
```

```
[M1_04]
BG: bg_room_night.jpg
CHAR: hung_bach_angry
NAME: Hùng Bạch
TEXT: Thấy chứ! Thấy là chúng ta đang nhu nhược quá!
```

```
[M1_05]
BG: bg_room_night.jpg
CHAR: hung_bach_angry
NAME: Hùng Bạch
TEXT: Bao nhiêu năm rồi – vận động, rải truyền đơn, họp hành bí mật... Trong khi đó nhân dân vẫn đói, vẫn bị đánh đập, vẫn chết!
```

```
[M1_06]
BG: bg_room_night.jpg
CHAR: hung_bach_angry
NAME: Hùng Bạch
TEXT: Cần hành động – hành động thực sự!
```

```
[M1_07]
BG: bg_room_night.jpg
CHAR: an_cuong_normal
NAME: An Cương
TEXT: Vấn đề không phải là nhanh hay chậm.
```

```
[M1_08]
BG: bg_room_night.jpg
CHAR: an_cuong_normal
NAME: An Cương
TEXT: Vấn đề là cơ sở giai cấp. Ba tổ chức hiện tại đều chưa xây dựng được đội tiên phong công nhân thuần túy.
```

```
[M1_09]
BG: bg_room_night.jpg
CHAR: an_cuong_normal
NAME: An Cuong
TEXT: Hợp nhất lại làm gì khi nền tảng đều chưa đúng?
```

```
[M1_10]
BG: bg_room_night.jpg
CHAR: lan_trieu_serious
NAME: Lan Triều
TEXT: Tôi nghe tất cả các anh.
```

```
[M1_11]
BG: bg_room_night.jpg
CHAR: lan_trieu_serious
NAME: Lan Triều
TEXT: Và tôi muốn hỏi một câu khác: Nếu cứ tiếp tục như thế này thêm ba năm nữa – chúng ta còn lại gì?
```

```
[M1_12]
BG: bg_room_night.jpg
CHAR: none
[NARR] Căn phòng im lặng. Ánh đèn dầu bỗng chập chờn.
[SFX: sfx_candle_flicker.mp3]
```

```
[M1_13]
BG: bg_room_night.jpg
CHAR: lan_trieu_normal
NAME: Lan Triều
TEXT: Minh. Em mới về. Em chưa bị cuốn vào thói quen của chúng tôi. Em thấy gì?
```

```
[M1_14]
BG: bg_room_night.jpg
CHAR: none
[NARR] Mọi ánh mắt đổ về phía bạn.
```

## ── ĐIỂM QUYẾT ĐỊNH 1 ──

```
[M1_CHOICE_01]
BG: bg_room_night.jpg
CHAR: minh_serious
NAME: (Bạn – MINH)
TEXT: Quan điểm của tôi là...
[CHOICE]
  A → "Chúng ta phải hợp nhất – ngay bây giờ, bất kể bất đồng." → GOTO M1_BRANCH_A
  B → "Hợp nhất là cần thiết – nhưng phải có cương lĩnh chung trước." → GOTO M1_BRANCH_B
  C → "Không cần hợp nhất – mỗi tổ chức phát huy thế mạnh riêng." → GOTO M1_BRANCH_C
```

---

## NHÁNH A – Hợp nhất vội vàng

```
[M1_BRANCH_A_01]
BG: bg_room_night.jpg
CHAR: hung_bach_happy
NAME: Hùng Bạch
TEXT: Đúng! Hợp nhất ngay! Tôi bầu anh Minh làm đại diện đàm phán!
```

```
[M1_BRANCH_A_02]
BG: bg_room_night.jpg
CHAR: an_cuong_serious
NAME: An Cương
TEXT: Hợp nhất theo đường lối nào? Ai quyết định?
```

```
[M1_BRANCH_A_03]
BG: bg_room_night.jpg
CHAR: an_cuong_serious
NAME: An Cương
TEXT: Nếu không thống nhất tư tưởng, chúng ta sẽ cãi nhau trong nội bộ thay vì đấu tranh với kẻ thù.
```

```
[M1_BRANCH_A_04]
BG: bg_room_night.jpg
CHAR: lan_trieu_sad
NAME: Lan Triều
TEXT: An Cương nói đúng một điểm: không thể hợp nhất khi chưa có nền tảng chung.
```

```
[M1_BRANCH_A_05]
BG: bg_room_night.jpg
CHAR: lan_trieu_sad
NAME: Lan Triều
TEXT: Minh ơi – em cần hiểu điều đó trước khi bước tiếp. Chúng ta sẽ gặp khó khăn hơn ở phía trước.
```

```
[M1_BRANCH_A_06]
BG: bg_room_night.jpg
CHAR: none
[NARR] ⚠️ PHÂN TÍCH: Hợp nhất về hình thức mà không có tư tưởng chung sẽ tạo ra "một thân xác, nhiều đầu óc." Mâu thuẫn nội bộ sẽ làm suy yếu phong trào từ bên trong.
[NARR] → Bạn tiếp tục với BẤT LỢI: phải giải quyết thêm mâu thuẫn nội bộ ở Màn 2.
→ GOTO M2_OPEN
```

---

## NHÁNH B – Hợp nhất có nguyên tắc ✅

```
[M1_BRANCH_B_01]
BG: bg_room_night.jpg
CHAR: lan_trieu_happy
NAME: Lan Triều
TEXT: Đó là câu trả lời tôi mong nghe.
```

```
[M1_BRANCH_B_02]
BG: bg_room_night.jpg
CHAR: lan_trieu_happy
NAME: Lan Triều
TEXT: Hợp nhất không phải là đích đến – đó là phương tiện. Điều kiện của phương tiện đó là: phải có cương lĩnh.
```

```
[M1_BRANCH_B_03]
BG: bg_room_night.jpg
CHAR: phung_thien_worried
NAME: Phụng Thiện
TEXT: Cương lĩnh gì? Anh nói như đơn giản lắm. Chúng ta bất đồng trên từng vấn đề cơ bản nhất...
```

```
[M1_BRANCH_B_04]
BG: bg_room_night.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Đúng. Và đó là lý do chúng ta phải thảo luận. Không phải để ai thắng ai – mà để tìm ra điều đúng.
```

```
[M1_BRANCH_B_05]
BG: bg_room_night.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Nếu chúng ta không thể ngồi lại với nhau và tranh luận trung thực, thì làm sao lãnh đạo được hàng triệu người?
```

```
[M1_BRANCH_B_06]
BG: bg_room_night.jpg
CHAR: none
[SFX: sfx_footsteps_outside.mp3]
[NARR] Tiếng bước chân bên ngoài. Cả phòng giật mình nín thở.
[NARR] ...Rồi im lặng trở lại.
```

```
[M1_BRANCH_B_07]
BG: bg_room_night.jpg
CHAR: lan_trieu_normal
NAME: Lan Triều
TEXT: Vậy thì bắt đầu từ câu hỏi đầu tiên. Câu hỏi quan trọng nhất.
```

```
[M1_BRANCH_B_08]
BG: bg_room_night.jpg
CHAR: lan_trieu_normal
NAME: Lan Triều
TEXT: Câu hỏi mà nếu ta trả lời sai, mọi thứ sẽ đổ vỡ: Mâu thuẫn nào là mâu thuẫn chủ yếu của xã hội này?
→ GOTO M2_OPEN
```

---

## NHÁNH C – Không hợp nhất ❌

```
[M1_BRANCH_C_01]
BG: bg_room_night.jpg
CHAR: lan_trieu_sad
NAME: Lan Triều
TEXT: Em... chắc chắn không?
```

```
[M1_BRANCH_C_02]
BG: bg_room_night.jpg
CHAR: minh_normal
NAME: MINH
TEXT: Mỗi tổ chức có thế mạnh riêng. Tại sao phải hợp nhất khi có thể tự phát triển?
```

```
[M1_BRANCH_C_03]
BG: bg_room_night.jpg
CHAR: lan_trieu_sad
NAME: Lan Triều
TEXT: Được. Em sẽ hiểu – theo cách đau hơn.
```

```
[M1_BRANCH_C_04]
BG: bg_black.jpg
CHAR: none
[NARR] ─── BA THÁNG SAU ───
[SFX: sfx_prison_door.mp3]
```

```
[M1_BRANCH_C_05]
BG: bg_black.jpg
CHAR: none
[NARR] ❌ KẾT QUẢ: Ba tổ chức tiếp tục hoạt động riêng lẻ. Mật thám tập trung vào từng tổ chức một.
[NARR] Đến giữa 1930: Hai tổ chức bị phá vỡ hoàn toàn. Phong trào Xô Viết Nghệ Tĩnh bùng lên nhưng không có lãnh đạo thống nhất – bị đàn áp trong một năm.
[NARR] Đến 1945: Không có lực lượng đủ mạnh để tận dụng cơ hội lịch sử...
[NARR] GAME OVER. Hãy quay lại và chọn khác.
[BGM: bgm_gameover.mp3]
→ GOTO M1_CHOICE_01
```

---

# ══════════════════════════════
# MÀN 2: CHỌN MÂU THUẪN TRUNG TÂM
# ══════════════════════════════

## CẢNH MỞ ĐẦU

```
[M2_OPEN_01]
BG: bg_village_day.jpg
CHAR: none
[NARR] Một làng quê vùng Trung Kỳ. Đầu năm 1930.
[NARR] Lan Triều đưa bạn về một vùng nông thôn.
[BGM: bgm_02_melancholy.mp3]
[SFX: sfx_birds_village.mp3]
```

```
[M2_OPEN_02]
BG: bg_village_day.jpg
CHAR: lan_trieu_normal
NAME: Lan Triều
TEXT: Muốn hiểu mâu thuẫn là gì, hãy nhìn vào nơi người ta đang chết.
```

```
[M2_OPEN_03]
BG: bg_village_day.jpg
CHAR: none
[NARR] Đây là làng Mỹ Cường.
[NARR] Dân số: 300 người. Số người bị bắt năm ngoái: 12. Số hộ không đủ ăn: hơn một nửa.
```

## CẢNH 2.1 – Dưới bóng cây đa

```
[M2_01]
BG: bg_village_well.jpg
CHAR: bac_thinh_sad
NAME: Bác Thịnh
TEXT: Lại có người từ tỉnh về. Lần trước mấy người từ tỉnh về, tuyên truyền cái gì đó, rồi đi.
```

```
[M2_02]
BG: bg_village_well.jpg
CHAR: bac_thinh_sad
NAME: Bác Thịnh
TEXT: Quan lại về làng, bắt mấy đứa thanh niên. Các anh lần này cũng vậy à?
```

```
[M2_03]
BG: bg_village_well.jpg
CHAR: cong_duy_normal
NAME: Công Duy
TEXT: Bác Thịnh, bác thấy làng mình khổ nhất vì cái gì?
```

```
[M2_04]
BG: bg_village_well.jpg
CHAR: bac_thinh_sad
NAME: Bác Thịnh
TEXT: Thuế. Tô. Sưu dịch. Năm nay lúa mất mùa, nhưng thuế không giảm. Tôi còn nợ từ năm ngoái chưa trả xong...
```

```
[M2_05]
BG: bg_village_well.jpg
CHAR: bac_thinh_sad
NAME: Bác Thịnh
TEXT: Mà ruộng tốt nhất trong làng – ai có? Tây có một ít, còn lại là ông Cai Liêm và mấy tên địa chủ.
```

```
[M2_06]
BG: bg_village_well.jpg
CHAR: bac_thinh_sad
NAME: Bác Thịnh
TEXT: Chúng tôi làm thuê cho họ, nộp hết năm sáu phần mười thu hoạch.
```

```
[M2_07]
BG: bg_village_well.jpg
CHAR: an_cuong_angry
NAME: An Cương
TEXT: Minh! Nghe tôi nói. Tôi đã phân tích rồi. Mâu thuẫn chủ yếu ở đây là mâu thuẫn GIAI CẤP.
```

```
[M2_08]
BG: bg_village_well.jpg
CHAR: an_cuong_angry
NAME: An Cương
TEXT: Nông dân với địa chủ. Công nhân với tư bản. Đây là quy luật Marxist không thể phủ nhận. Nhiệm vụ trước tiên là đánh đổ giai cấp bóc lột!
```

```
[M2_09]
BG: bg_village_well.jpg
CHAR: phung_thien_worried
NAME: Phụng Thiện
TEXT: Đồng chí An Cương lại lý thuyết rồi. Nhìn bác Thịnh đây: ông ấy không quan tâm giai cấp hay dân tộc.
```

```
[M2_10]
BG: bg_village_well.jpg
CHAR: phung_thien_worried
NAME: Phụng Thiện
TEXT: Ông ấy muốn sống sót. Cải cách kinh tế trong khuôn khổ pháp lý – giảm thuế, mở trường học – thực tế hơn nhiều!
```

```
[M2_11]
BG: bg_village_well.jpg
CHAR: hung_bach_angry
NAME: Hùng Bạch
TEXT: Hai ông đều sai! Không có gì thực tế ở đây cả! Thực dân Pháp là kẻ thù. Địa chủ là tay sai của thực dân.
```

```
[M2_12]
BG: bg_village_well.jpg
CHAR: hung_bach_angry
NAME: Hùng Bạch
TEXT: Đánh một phát là đánh cả hai. Không cần phân tích gì thêm!
```

```
[M2_13]
BG: bg_village_well.jpg
CHAR: bac_thinh_normal
NAME: Bác Thịnh
TEXT: Anh ơi. Tôi không biết giai cấp, không biết dân tộc.
```

```
[M2_14]
BG: bg_village_well.jpg
CHAR: bac_thinh_normal
NAME: Bác Thịnh
TEXT: Tôi biết một điều: cả thằng Pháp lẫn thằng Cai Liêm – đều đang đè lên lưng tôi.
```

```
[M2_15]
BG: bg_village_well.jpg
CHAR: bac_thinh_normal
NAME: Bác Thịnh
TEXT: Nhưng nếu không có thằng Pháp, thằng Cai Liêm có dám làm thế không? Trước khi Pháp vào, làng này không khổ thế này đâu.
```

```
[M2_16]
BG: bg_village_well.jpg
CHAR: lan_trieu_normal
NAME: Lan Triều
TEXT: (nhìn Minh, không nói gì)
```

## ── ĐIỂM QUYẾT ĐỊNH 2 ──

```
[M2_CHOICE_01]
BG: bg_village_well.jpg
CHAR: minh_serious
NAME: (Bạn – MINH)
TEXT: Tôi suy nghĩ về những gì bác Thịnh vừa nói... Mâu thuẫn chủ yếu là:
[CHOICE]
  A → "Mâu thuẫn GIAI CẤP – phải ưu tiên đánh đổ địa chủ và tư sản." → GOTO M2_BRANCH_A
  B → "Mâu thuẫn DÂN TỘC – toàn thể nhân dân chống thực dân là trọng tâm." → GOTO M2_BRANCH_B
  C → "Không có mâu thuẫn chủ yếu – phải giải quyết tất cả đồng thời." → GOTO M2_BRANCH_C
```

---

## NHÁNH A – Mâu thuẫn giai cấp ❌

```
[M2_BRANCH_A_01]
BG: bg_village_well.jpg
CHAR: an_cuong_happy
NAME: An Cương
TEXT: Đúng rồi! Tôi đã nói mà! Phải đặt đấu tranh giai cấp lên hàng đầu!
```

```
[M2_BRANCH_A_02]
BG: bg_village_well.jpg
CHAR: bac_thinh_worried
NAME: Bác Thịnh
TEXT: Nhưng... đánh địa chủ xong thì ai bảo vệ làng tôi khỏi thằng Pháp?
```

```
[M2_BRANCH_A_03]
BG: bg_village_well.jpg
CHAR: lan_trieu_sad
NAME: Lan Triều
TEXT: Minh ơi. Em vừa đặt xe trước ngựa. Hãy suy nghĩ lại.
```

```
[M2_BRANCH_A_04]
BG: bg_village_well.jpg
CHAR: none
[NARR] ❌ PHÂN TÍCH: Trong xã hội thuộc địa, không thể giải quyết mâu thuẫn giai cấp khi đất nước chưa độc lập.
[NARR] Dù có đánh đổ địa chủ – chính quyền thuộc địa sẽ lập tức phục hồi trật tự cũ. Phong trào bị phân tán. Thực dân lợi dụng chia rẽ giai cấp để đàn áp.
[NARR] Hãy chọn lại.
→ GOTO M2_CHOICE_01
```

---

## NHÁNH B – Mâu thuẫn dân tộc ✅

```
[M2_BRANCH_B_01]
BG: bg_village_well.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Mâu thuẫn chủ yếu là giữa dân tộc Việt Nam và thực dân Pháp.
```

```
[M2_BRANCH_B_02]
BG: bg_village_well.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Điều này không có nghĩa là bỏ qua giai cấp – mà là nhận ra: không thể giải phóng giai cấp khi dân tộc chưa được giải phóng.
```

```
[M2_BRANCH_B_03]
BG: bg_village_well.jpg
CHAR: an_cuong_normal
NAME: An Cương
TEXT: Tôi... không hoàn toàn đồng ý. Nhưng tôi nghe thấy lý lẽ của anh.
```

```
[M2_BRANCH_B_04]
BG: bg_village_well.jpg
CHAR: an_cuong_normal
NAME: An Cương
TEXT: Và tôi nghe thấy bác Thịnh.
```

```
[M2_BRANCH_B_05]
BG: bg_village_well.jpg
CHAR: bac_thinh_normal
NAME: Bác Thịnh
TEXT: Anh nói đúng. Nếu đuổi được thằng Pháp đi – thằng Cai Liêm còn chỗ nào mà núp?
```

```
[M2_BRANCH_B_06]
BG: bg_village_well.jpg
CHAR: phung_thien_normal
NAME: Phụng Thiện
TEXT: Nếu vậy, người lãnh đạo phong trào phải là ai? Và lực lượng nào là nòng cốt?
```

```
[M2_BRANCH_B_07]
BG: bg_village_well.jpg
CHAR: lan_trieu_happy
NAME: Lan Triều
TEXT: Câu hỏi tiếp theo vừa được đặt ra rồi đó.
→ GOTO M3_OPEN
```

---

## NHÁNH C – Không có mâu thuẫn chủ yếu ❌

```
[M2_BRANCH_C_01]
BG: bg_village_well.jpg
CHAR: lan_trieu_sad
NAME: Lan Triều
TEXT: Đánh nhiều mặt trận cùng lúc với sức mạnh bằng nhau – đó không phải chiến lược. Đó là không có chiến lược.
```

```
[M2_BRANCH_C_02]
BG: bg_village_well.jpg
CHAR: bac_thinh_worried
NAME: Bác Thịnh
TEXT: Anh đang nói chúng tôi phải làm gì vậy? Tôi không hiểu...
```

```
[M2_BRANCH_C_03]
BG: bg_village_well.jpg
CHAR: none
[NARR] ❌ PHÂN TÍCH: Thiếu trọng điểm chiến lược. Quần chúng cần biết rõ họ đứng về phía nào, chống ai, vì cái gì.
[NARR] Hãy chọn lại.
→ GOTO M2_CHOICE_01
```

---

# ══════════════════════════════
# MÀN 3: XÁC ĐỊNH LỰC LƯỢNG
# ══════════════════════════════

```
[M3_OPEN_01]
BG: bg_warehouse_night.jpg
CHAR: none
[NARR] Một thị trấn vùng ven. Đêm khuya.
[NARR] Trong một kho hàng bỏ hoang. Tiếng xe ngựa bên ngoài.
[BGM: bgm_03_tense.mp3]
[SFX: sfx_horse_carriage.mp3]
```

```
[M3_01]
BG: bg_warehouse_night.jpg
CHAR: an_cuong_serious
NAME: An Cương
TEXT: Rõ ràng rồi. Giai cấp công nhân là lực lượng lãnh đạo. Đây không phải ý kiến của tôi – đây là quy luật lịch sử.
```

```
[M3_02]
BG: bg_warehouse_night.jpg
CHAR: an_cuong_serious
NAME: An Cương
TEXT: Giai cấp vô sản, do bản chất của mình, là giai cấp cách mạng nhất, triệt để nhất.
```

```
[M3_03]
BG: bg_warehouse_night.jpg
CHAR: hung_bach_normal
NAME: Hùng Bạch
TEXT: Công nhân Việt Nam bao nhiêu người? So với mấy chục triệu nông dân?
```

```
[M3_04]
BG: bg_warehouse_night.jpg
CHAR: hung_bach_normal
NAME: Hùng Bạch
TEXT: Dựa vào công nhân thôi – chúng ta không thể thắng.
```

```
[M3_05]
BG: bg_warehouse_night.jpg
CHAR: an_cuong_serious
NAME: An Cương
TEXT: Không phải về số lượng – là về chất lượng và vai trò lịch sử! Nông dân có thể tham gia, nhưng phải dưới sự lãnh đạo của giai cấp công nhân.
```

```
[M3_06]
BG: bg_warehouse_night.jpg
CHAR: phung_thien_worried
NAME: Phụng Thiện
TEXT: Và tầng lớp trí thức, tiểu tư sản như tôi? Chúng tôi không có chỗ à?
```

```
[M3_07]
BG: bg_warehouse_night.jpg
CHAR: phung_thien_worried
NAME: Phụng Thiện
TEXT: Nhiều người trong chúng tôi đã hy sinh, đã bị tù, đã mất tất cả...
```

```
[M3_08]
BG: bg_warehouse_night.jpg
CHAR: cong_duy_normal
NAME: Công Duy
TEXT: Anh Phụng Thiện, tôi nói thật nhé: chúng tôi cần anh.
```

```
[M3_09]
BG: bg_warehouse_night.jpg
CHAR: cong_duy_normal
NAME: Công Duy
TEXT: Không phải vì anh là tư sản hay tiểu tư sản – mà vì anh biết chữ, biết pháp lý, biết cách nói chuyện với nhiều tầng lớp khác nhau.
```

```
[M3_10]
BG: bg_warehouse_night.jpg
CHAR: cong_duy_normal
NAME: Công Duy
TEXT: Cách mạng cần tất cả mọi người – nhưng cần họ đúng vai trò.
```

```
[M3_11]
BG: bg_warehouse_night.jpg
CHAR: lan_trieu_normal
NAME: Lan Triều
TEXT: (nhìn Minh, gật đầu nhẹ)
```

## ── ĐIỂM QUYẾT ĐỊNH 3 ──

```
[M3_CHOICE_01]
BG: bg_warehouse_night.jpg
CHAR: minh_serious
NAME: (Bạn – MINH)
TEXT: Lực lượng nòng cốt của cách mạng phải là...
[CHOICE]
  A → "Chỉ giai cấp công nhân – lực lượng tiên phong và duy nhất." → GOTO M3_BRANCH_A
  B → "Toàn thể dân tộc – không phân biệt giai cấp, ai cũng như ai." → GOTO M3_BRANCH_B
  C → "Liên minh công-nông là nòng cốt, có thể thu hút tầng lớp khác tùy điều kiện." → GOTO M3_BRANCH_C
```

---

## NHÁNH A – Chỉ công nhân ❌

```
[M3_BRANCH_A_01]
BG: bg_warehouse_night.jpg
CHAR: hung_bach_angry
NAME: Hùng Bạch
TEXT: Vô lý! Công nhân Việt Nam chưa đến một triệu người. Bỏ đi mấy chục triệu nông dân à?
```

```
[M3_BRANCH_A_02]
BG: bg_warehouse_night.jpg
CHAR: bac_thinh_sad
NAME: Bác Thịnh
TEXT: Vậy chúng tôi không được tham gia?
```

```
[M3_BRANCH_A_03]
BG: bg_warehouse_night.jpg
CHAR: none
[NARR] ❌ PHÂN TÍCH: Ở Việt Nam 1929-1930, giai cấp công nhân công nghiệp còn nhỏ bé. Bỏ qua nông dân chiếm 90% dân số là tự cô lập. Không có sức mạnh quần chúng rộng lớn, không thể tạo nên cách mạng thực sự.
[NARR] Hãy chọn lại.
→ GOTO M3_CHOICE_01
```

---

## NHÁNH B – Toàn dân không phân biệt ⚠️

```
[M3_BRANCH_B_01]
BG: bg_warehouse_night.jpg
CHAR: lan_trieu_worried
NAME: Lan Triều
TEXT: Nếu "toàn dân không phân biệt" – thì cả những kẻ đang hưởng lợi từ thuộc địa cũng vào?
```

```
[M3_BRANCH_B_02]
BG: bg_warehouse_night.jpg
CHAR: an_cuong_serious
NAME: An Cương
TEXT: Không có hạt nhân lãnh đạo – ai sẽ quyết định hướng đi sau khi giành độc lập?
```

```
[M3_BRANCH_B_03]
BG: bg_warehouse_night.jpg
CHAR: none
[NARR] ⚠️ PHÂN TÍCH: Tư tưởng dân tộc chủ nghĩa thuần túy. Thiếu hạt nhân lãnh đạo. Sau khi giành độc lập, tầng lớp thống trị mới sẽ chiếm lĩnh. Bạn tiếp tục nhưng với BẤT LỢI ở Màn 4.
→ GOTO M4_OPEN
```

---

## NHÁNH C – Liên minh công-nông ✅

```
[M3_BRANCH_C_01]
BG: bg_warehouse_night.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Giai cấp công nhân lãnh đạo – vì tính tổ chức, tính tiên tiến của mình. Nông dân là lực lượng đông đảo nhất, chịu áp bức nặng nề nhất.
```

```
[M3_BRANCH_C_02]
BG: bg_warehouse_night.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Liên minh công-nông là nền tảng. Từ đó chúng ta có thể thu hút tiểu tư sản, trí thức, tư sản dân tộc vào mặt trận rộng lớn hơn.
```

```
[M3_BRANCH_C_03]
BG: bg_warehouse_night.jpg
CHAR: cong_duy_happy
NAME: Công Duy
TEXT: Đúng. Chính tôi đã thấy điều đó khi tổ chức đình công – một mình không được, nhưng khi có nông dân ở vùng lân cận ủng hộ, sức mạnh khác hẳn.
```

```
[M3_BRANCH_C_04]
BG: bg_warehouse_night.jpg
CHAR: phung_thien_normal
NAME: Phụng Thiện
TEXT: Và tôi – tôi sẽ dùng kiến thức của mình để giúp phong trào, không phải để lãnh đạo thay công nhân hay nông dân.
```

```
[M3_BRANCH_C_05]
BG: bg_warehouse_night.jpg
CHAR: an_cuong_normal
NAME: An Cương
TEXT: ...Tôi không phủ nhận hoàn toàn. Đây là sự vận dụng có điều chỉnh theo thực tiễn.
```

```
[M3_BRANCH_C_06]
BG: bg_warehouse_night.jpg
CHAR: lan_trieu_happy
NAME: Lan Triều
TEXT: Tốt. Bây giờ chúng ta có hướng đi. Câu hỏi còn lại: làm thế nào?
→ GOTO M4_OPEN
```

## CẢNH PHỤ 3.2 – Bác Thịnh và Công Duy

```
[M3_EXTRA_01]
BG: bg_village_night.jpg
CHAR: cong_duy_normal
NAME: Công Duy
TEXT: Bác Thịnh ơi. Nếu chúng tôi tổ chức được – nếu có lực lượng đủ mạnh, đủ thống nhất – bác sẽ tin không?
```

```
[M3_EXTRA_02]
BG: bg_village_night.jpg
CHAR: bac_thinh_sad
NAME: Bác Thịnh
TEXT: Tôi đã tin nhiều lần rồi. Lần nào cũng thất bại.
```

```
[M3_EXTRA_03]
BG: bg_village_night.jpg
CHAR: bac_thinh_sad
NAME: Bác Thịnh
TEXT: Nhưng... tôi có bốn đứa con. Tôi không muốn chúng sống như tôi. Nếu các anh thực sự làm được – thực sự, không phải nói suông – thì tôi sẽ là người cuối cùng bỏ đi.
```

```
[M3_EXTRA_04]
BG: bg_village_night.jpg
CHAR: cong_duy_serious
NAME: Công Duy
TEXT: Và tôi hứa với bác: nếu chúng tôi nói suông, bác có quyền phán xét chúng tôi.
[BGM: bgm_03_tense_end.mp3]
→ GOTO M4_OPEN
```

---

# ══════════════════════════════
# MÀN 4: PHƯƠNG PHÁP ĐẤU TRANH
# ══════════════════════════════

```
[M4_OPEN_01]
BG: bg_meeting_urgent.jpg
CHAR: none
[NARR] Mùa xuân năm 1930. Phong trào quần chúng đang bùng lên ở nhiều nơi.
[NARR] Đây là thời điểm nguy hiểm nhất: khi có sức mạnh quần chúng, sai lầm về phương pháp có thể làm tiêu tan tất cả.
[BGM: bgm_04_urgent.mp3]
[SFX: sfx_urgent_footsteps.mp3]
```

```
[M4_01]
BG: bg_meeting_urgent.jpg
CHAR: hung_bach_excited
NAME: Hùng Bạch
TEXT: Tin mới nhất: một nhóm thanh niên ở huyện lỵ đang tự vũ trang, chuẩn bị tấn công đồn!
```

```
[M4_02]
BG: bg_meeting_urgent.jpg
CHAR: hung_bach_excited
NAME: Hùng Bạch
TEXT: Đây là thời cơ! Khi quần chúng sục sôi, phải hành động ngay! Trễ một ngày là mất một cơ hội!
```

```
[M4_03]
BG: bg_meeting_urgent.jpg
CHAR: hung_bach_excited
NAME: Hùng Bạch
TEXT: Tôi đề nghị: ủng hộ nhóm thanh niên đó, phát động tấn công đồng loạt!
```

```
[M4_04]
BG: bg_meeting_urgent.jpg
CHAR: phung_thien_scared
NAME: Phụng Thiện
TEXT: Điên rồ! Họ có vũ khí gì? Mấy con dao với mấy khẩu súng cướp được?
```

```
[M4_05]
BG: bg_meeting_urgent.jpg
CHAR: phung_thien_scared
NAME: Phụng Thiện
TEXT: Thực dân có thể điều cả trung đoàn đến trong 48 tiếng. Người chết sẽ là nhân dân – không phải mấy tên quan lại.
```

```
[M4_06]
BG: bg_meeting_urgent.jpg
CHAR: an_cuong_normal
NAME: An Cương
TEXT: Theo lý thuyết, điều kiện cách mạng gồm: giai cấp thống trị không thể cai trị như cũ, quần chúng không chịu đựng được nữa, tầng lớp tiên phong sẵn sàng. Ba điều kiện đó đã đủ chưa?
```

```
[M4_07]
BG: bg_meeting_urgent.jpg
CHAR: cong_duy_serious
NAME: Công Duy
TEXT: Tôi hiểu anh Hùng Bạch. Tôi cũng nóng lòng như vậy.
```

```
[M4_08]
BG: bg_meeting_urgent.jpg
CHAR: cong_duy_serious
NAME: Công Duy
TEXT: Nhưng tôi đã chứng kiến một cuộc đình công tự phát – chúng tôi phá được xưởng, đánh được vài tên cai – rồi họ bắt 30 người. 30 người đó mất 5 năm tù.
```

```
[M4_09]
BG: bg_meeting_urgent.jpg
CHAR: cong_duy_serious
NAME: Công Duy
TEXT: Phong trào tê liệt 3 năm. Cái giá đó có xứng không?
```

```
[M4_10]
BG: bg_meeting_urgent.jpg
CHAR: none
[NARR] Minh nhìn bản đồ trên bàn.
[NARR] Vùng A: Nông dân tự phát tập hợp, chưa có lãnh đạo rõ ràng.
[NARR] Vùng B: Công nhân đình công, đang giữ được trật tự.
[NARR] Vùng C: Một nhóm nhỏ đã tấn công đồn – bị đàn áp trong 6 tiếng, 8 người chết.
[SFX: sfx_map_paper.mp3]
```

## ── ĐIỂM QUYẾT ĐỊNH 4 ──

```
[M4_CHOICE_01]
BG: bg_meeting_urgent.jpg
CHAR: minh_serious
NAME: (Bạn – MINH)
TEXT: Quyết định của tôi là...
[CHOICE]
  A → "Ủng hộ bạo động tự phát – thời cơ không chờ đợi!" → GOTO M4_BRANCH_A
  B → "Kiềm chế tất cả – chưa đến lúc, cần chờ thêm." → GOTO M4_BRANCH_B
  C → "Tổ chức đấu tranh có chiến lược – ủng hộ đình công có tổ chức, bảo tồn lực lượng." → GOTO M4_BRANCH_C
```

---

## NHÁNH A – Bạo động tự phát ❌

```
[M4_BRANCH_A_01]
BG: bg_battle_scene.jpg
CHAR: none
[NARR] Hai ngày sau...
[SFX: sfx_gunshots.mp3]
```

```
[M4_BRANCH_A_02]
BG: bg_battle_scene.jpg
CHAR: none
[NARR] ❌ KẾT QUẢ: Bạo động không có tổ chức, không có lực lượng đủ mạnh, không có chiến lược rút lui. Vùng C lặp lại ở khắp nơi. Hàng trăm người bị bắt. Phong trào tan vỡ.
[NARR] Đây là bài học của khởi nghĩa Yên Bái 1930: dũng cảm không đủ – phải có cơ sở quần chúng và tổ chức vững chắc.
[NARR] Hãy chọn lại.
→ GOTO M4_CHOICE_01
```

---

## NHÁNH B – Kiềm chế hoàn toàn ❌

```
[M4_BRANCH_B_01]
BG: bg_meeting_urgent.jpg
CHAR: hung_bach_angry
NAME: Hùng Bạch
TEXT: Lại "chưa đến lúc"! Bao giờ mới đến lúc?! Người ta đang chết ngoài đó!
```

```
[M4_BRANCH_B_02]
BG: bg_meeting_urgent.jpg
CHAR: bac_thinh_sad
NAME: Bác Thịnh
TEXT: (qua thư) Anh Minh ơi... thanh niên làng tôi hỏi: lãnh đạo ở đâu? Chúng tôi chờ mà không thấy ai...
```

```
[M4_BRANCH_B_03]
BG: bg_meeting_urgent.jpg
CHAR: none
[NARR] ❌ PHÂN TÍCH: Khi quần chúng đang sục sôi mà lãnh đạo không có hành động – sẽ mất uy tín và mất quần chúng. Cách mạng không phải lúc nào cũng chờ điều kiện hoàn hảo.
[NARR] Hãy chọn lại.
→ GOTO M4_CHOICE_01
```

---

## NHÁNH C – Đấu tranh có chiến lược ✅

```
[M4_BRANCH_C_01]
BG: bg_meeting_urgent.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Vùng B – ủng hộ đình công có tổ chức. Đây là hình thức quần chúng có thể tham gia rộng rãi và bảo vệ được nhau.
```

```
[M4_BRANCH_C_02]
BG: bg_meeting_urgent.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Vùng A – xây dựng tổ chức quần chúng, không kích động bạo động vô kế hoạch.
```

```
[M4_BRANCH_C_03]
BG: bg_meeting_urgent.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Vùng C – rút bài học. Không để bi kịch đó lặp lại. Bảo tồn lực lượng là nghĩa vụ với người đã hy sinh.
```

```
[M4_BRANCH_C_04]
BG: bg_meeting_urgent.jpg
CHAR: cong_duy_happy
NAME: Công Duy
TEXT: Đúng. Mỗi đồng chí bị bắt, mỗi cơ sở bị lộ – là mất mát không thể bù ngay. Bảo tồn lực lượng không phải là hèn nhát – là trách nhiệm.
```

```
[M4_BRANCH_C_05]
BG: bg_meeting_urgent.jpg
CHAR: hung_bach_normal
NAME: Hùng Bạch
TEXT: (im lặng lâu) ...Được. Tôi nghe.
```

## CẢNH PHỤ 4.2 – Hùng Bạch và Minh

```
[M4_EXTRA_01]
BG: bg_courtyard_night.jpg
CHAR: hung_bach_sad
NAME: Hùng Bạch
TEXT: Anh nghĩ tôi sai phải không. Anh nghĩ tôi nóng nảy, không suy nghĩ.
```

```
[M4_EXTRA_02]
BG: bg_courtyard_night.jpg
CHAR: minh_normal
NAME: MINH
TEXT: Không. Tôi nghĩ anh đúng về một điều: không thể ngồi yên mãi. Nhưng có sự khác biệt giữa hành động và hành động đúng lúc, đúng cách.
```

```
[M4_EXTRA_03]
BG: bg_courtyard_night.jpg
CHAR: hung_bach_sad
NAME: Hùng Bạch
TEXT: Tôi đã từng có một người bạn. Hai mươi lăm tuổi. Tham gia một cuộc khởi nghĩa tự phát ở miền núi. Chết trong ba ngày.
```

```
[M4_EXTRA_04]
BG: bg_courtyard_night.jpg
CHAR: hung_bach_sad
NAME: Hùng Bạch
TEXT: Không ai nhớ tên anh ấy. Không ai biết anh ấy đã chết để làm gì.
```

```
[M4_EXTRA_05]
BG: bg_courtyard_night.jpg
CHAR: hung_bach_normal
NAME: Hùng Bạch
TEXT: Đó là lý do tôi muốn làm gì đó – ngay, bây giờ, trước khi thêm một người nữa chết vô ích. Nhưng anh nói đúng... 'ngay bây giờ' không có nghĩa là 'không có kế hoạch.'
[BGM: bgm_04_resolve.mp3]
→ GOTO M5_OPEN
```

---

# ══════════════════════════════
# MÀN 5: HAI DÒNG LỊCH SỬ
# ══════════════════════════════

```
[M5_OPEN_01]
BG: bg_conference_room.jpg
CHAR: none
[NARR] Tháng 2 năm 1930.
[NARR] Các đại biểu từ ba tổ chức đã ngồi lại. Trên bàn là bản thảo một văn kiện.
[NARR] Tên của văn kiện chưa được đặt. Nhưng mỗi dòng, mỗi chữ – sẽ là di sản cho những thế hệ chưa sinh ra.
[BGM: bgm_05_solemn.mp3]
```

```
[M5_01]
BG: bg_conference_room.jpg
CHAR: lan_trieu_serious
NAME: Lan Triều
TEXT: Chúng ta có đủ rồi. Mâu thuẫn chủ yếu: đã xác định. Lực lượng nòng cốt: đã xác định. Phương pháp đấu tranh: đã xác định. Còn một điều cuối cùng.
```

```
[M5_02]
BG: bg_conference_room.jpg
CHAR: an_cuong_normal
NAME: An Cương
TEXT: Điều gì?
```

```
[M5_03]
BG: bg_conference_room.jpg
CHAR: lan_trieu_serious
NAME: Lan Triều
TEXT: Mục tiêu cuối cùng. Sau khi giành độc lập dân tộc – chúng ta xây dựng đất nước này theo hướng nào?
```

```
[M5_04]
BG: bg_conference_room.jpg
CHAR: phung_thien_normal
NAME: Phụng Thiện
TEXT: Cái đó... xa quá. Chúng ta lo cái trước mắt trước đi.
```

```
[M5_05]
BG: bg_conference_room.jpg
CHAR: lan_trieu_serious
NAME: Lan Triều
TEXT: Không. Người ta sẽ không hy sinh cho một đích đến mờ mịt.
```

```
[M5_06]
BG: bg_conference_room.jpg
CHAR: lan_trieu_serious
NAME: Lan Triều
TEXT: Họ cần biết: sau tất cả những gì họ chịu đựng, sau những gì họ mất – họ và con cháu họ sẽ được sống trong thế giới như thế nào?
```

```
[M5_07]
BG: bg_conference_room.jpg
CHAR: none
[NARR] Ánh mắt mọi người đổ về phía Minh.
```

```
[M5_08]
BG: bg_conference_room.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Thì chúng ta viết thật. Không phải lời hứa hoa mỹ. Không phải khẩu hiệu rỗng tuếch.
```

```
[M5_09]
BG: bg_conference_room.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Chúng ta viết: Đánh đuổi thực dân. Xóa bỏ chế độ phong kiến. Đất cho người cày. Độc lập dân tộc.
```

```
[M5_10]
BG: bg_conference_room.jpg
CHAR: minh_serious
NAME: MINH
TEXT: Và tiến lên – xây dựng một xã hội không có người bóc lột người.
```

```
[M5_11]
BG: bg_conference_room.jpg
CHAR: minh_normal
NAME: MINH
TEXT: Đó không phải là ảo tưởng. Đó là hướng đi – và có hướng đi, con người mới có sức mạnh đi tiếp.
```

```
[M5_12]
BG: bg_conference_room.jpg
CHAR: none
[NARR] Hùng Bạch nhìn xuống – lần đầu tiên không nói gì.
[NARR] An Cương gật đầu, chậm mà chắc.
[NARR] Phụng Thiện nhìn ra cửa sổ. Ở đường chân trời, có gì đó đang hửng sáng.
[SFX: sfx_pen_writing.mp3]
```

## CẢNH KẾT – Hai dòng lịch sử

```
[M5_SPLIT_01]
BG: bg_split_screen.jpg
CHAR: none
[NARR] ─── DÒNG A: NẾU KHÔNG CÓ CƯƠNG LĨNH ĐÚNG ĐẮN ───
[NARR] 1930–1935: Ba tổ chức hợp nhất hình thức nhưng không có đường lối chung. Phong trào bị đàn áp, không phục hồi được.
[NARR] 1945: Thời cơ lịch sử bị bỏ lỡ. Không có chính quyền cách mạng. Pháp quay lại.
[NARR] 1975: Không xảy ra. Đất nước vẫn chia cắt.
[NARR] Hiện tại: Một đất nước chưa hoàn toàn độc lập. Người dân như bác Thịnh vẫn truyền lại nỗi lo toan cho con cháu.
[BGM: bgm_05_somber.mp3]
```

```
[M5_SPLIT_02]
BG: bg_split_screen.jpg
CHAR: none
[NARR] ─── DÒNG B: DÒNG LỊCH SỬ THỰC TẾ ───
[NARR] 1930: Đảng Cộng sản Việt Nam thành lập. Cương lĩnh chính trị đầu tiên ra đời.
[NARR] 1941: Mặt trận Việt Minh ra đời, thu hút rộng rãi mọi tầng lớp.
[NARR] Tháng 8-1945: Cách mạng tháng Tám thành công trong 10 ngày. Tuyên ngôn Độc lập 2-9-1945.
[NARR] 1954: Chiến thắng Điện Biên Phủ. Miền Bắc giải phóng.
[NARR] 1975: Thống nhất đất nước ngày 30-4-1975.
[NARR] 1986: Đổi Mới. Mở cửa. Phát triển.
[NARR] Hiện tại: Độc lập – Hội nhập – Phát triển.
[BGM: bgm_05_triumph.mp3]
```

## CẢNH KẾT CUỐI

```
[M5_FINAL_01]
BG: bg_sunrise.jpg
CHAR: lan_trieu_normal
NAME: Lan Triều
TEXT: Lịch sử không do thiên mệnh quyết định.
```

```
[M5_FINAL_02]
BG: bg_sunrise.jpg
CHAR: lan_trieu_normal
NAME: Lan Triều
TEXT: Lịch sử do con người quyết định – bằng những lựa chọn đúng, vào những thời điểm đúng, với những lý lẽ đủ sâu để chịu đựng được sự thử thách của thời gian.
```

```
[M5_FINAL_03]
BG: bg_sunrise.jpg
CHAR: none
[NARR] Bình minh đã đến.
[BGM: bgm_ending.mp3]
[SFX: sfx_birds_morning.mp3]
```

---

# ══════════════════════════════
# MÀN HÌNH KẾT QUẢ
# ══════════════════════════════

```
[RESULT_01]
BG: bg_result_screen.jpg
CHAR: none
[NARR] ─── KẾT QUẢ CỦA BẠN ───
[NARR] Điểm chiến lược: [SCORE]/100
[NARR] Số quyết định đúng: [CORRECT]/4
[NARR] ─── BÀI HỌC LỊCH SỬ ───
[NARR] 1. Xác định đúng mâu thuẫn chủ yếu là nền tảng của mọi đường lối.
[NARR] 2. Giải phóng dân tộc là tiền đề của giải phóng giai cấp trong hoàn cảnh thuộc địa.
[NARR] 3. Liên minh công-nông là hạt nhân sức mạnh cách mạng.
[NARR] 4. Đường lối đúng tạo ra thống nhất hành động – đó là bước ngoặt lịch sử.
[NARR] Cảm ơn bạn đã trải nghiệm "BÌNH MINH CHƯA ĐẾN."
```
