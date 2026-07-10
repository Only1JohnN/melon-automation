# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should not duplicate category after browser refresh
- Location: tests/ui/partners/categories.spec.ts:1023:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('table').locator('tr:has-text("AUTO-CAT-1783648358680")')
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('table').locator('tr:has-text("AUTO-CAT-1783648358680")')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - complementary [ref=e5]:
      - img "melon logo" [ref=e8]
      - generic [ref=e12]:
        - generic [ref=e14]:
          - link [ref=e15] [cursor=pointer]:
            - /url: /home
            - img [ref=e17]
          - link [ref=e20] [cursor=pointer]:
            - /url: /offers
            - img [ref=e22]
          - link [ref=e26]:
            - /url: /inventory/category
            - img [ref=e28]
        - generic [ref=e32]:
          - link [ref=e33] [cursor=pointer]:
            - /url: /inventory/products
            - img [ref=e35]
          - link [ref=e38] [cursor=pointer]:
            - /url: /order-mgmt
            - img [ref=e40]
          - link [ref=e45] [cursor=pointer]:
            - /url: /inventory/warehouse
            - img [ref=e47]
          - link [ref=e51] [cursor=pointer]:
            - /url: /inventory/category
            - img [ref=e54]
        - link [ref=e63] [cursor=pointer]:
          - /url: /transactions
          - img [ref=e65]
        - generic [ref=e70]:
          - link [ref=e71] [cursor=pointer]:
            - /url: /settings/profile
            - img [ref=e73]
          - link [ref=e76]:
            - /url: /inventory/category
            - img [ref=e78]
      - button [ref=e85] [cursor=pointer]:
        - img [ref=e89]
    - generic [ref=e90]:
      - generic [ref=e93]:
        - button "9+" [ref=e94] [cursor=pointer]:
          - img [ref=e95]
          - generic [ref=e98]: 9+
        - button [ref=e99] [cursor=pointer]:
          - img [ref=e103]
      - main [ref=e104]:
        - generic [ref=e106]:
          - navigation [ref=e107]
          - generic [ref=e108]:
            - generic [ref=e109]:
              - generic [ref=e110]:
                - heading "Category" [level=1] [ref=e111]
                - button "Add Category" [ref=e112] [cursor=pointer]:
                  - img [ref=e113]
                  - text: Add Category
              - generic [ref=e114]:
                - generic [ref=e115]:
                  - generic [ref=e116]:
                    - heading "Active Categories" [level=3] [ref=e117]
                    - paragraph [ref=e118]: "2"
                  - img [ref=e120]
                - generic [ref=e123]:
                  - generic [ref=e124]:
                    - heading "Utilization Rate" [level=3] [ref=e125]
                    - paragraph [ref=e126]: 20%
                  - img [ref=e128]
                - generic [ref=e131]:
                  - generic [ref=e132]:
                    - heading "Top Category" [level=3] [ref=e133]
                    - paragraph [ref=e134]: AUTO-CAT-1783441233025
                  - img [ref=e136]
            - generic [ref=e140]:
              - textbox "Search by category name" [ref=e142]
              - table [ref=e145]:
                - rowgroup [ref=e146]:
                  - row "Category Name Description Quantity of items Date & Time" [ref=e147]:
                    - columnheader "Category Name" [ref=e148]
                    - columnheader "Description" [ref=e149]
                    - columnheader "Quantity of items" [ref=e150]
                    - columnheader "Date & Time" [ref=e151]
                    - columnheader [ref=e152]
                - rowgroup [ref=e153]:
                  - row "AUTO-CAT-1783441233025 Trim Validation 13 2026-07-07 04:20:35 PM Open menu" [ref=e154]:
                    - cell "AUTO-CAT-1783441233025" [ref=e155]
                    - cell "Trim Validation" [ref=e156]
                    - cell "13" [ref=e157]
                    - cell "2026-07-07 04:20:35 PM" [ref=e158]
                    - cell "Open menu" [ref=e159]:
                      - button "Open menu" [ref=e160] [cursor=pointer]:
                        - generic [ref=e161]: Open menu
                        - img [ref=e162]
                  - row "AUTO-CAT-1783501582975 Trim Validation 1 2026-07-08 09:06:25 AM Open menu" [ref=e166]:
                    - cell "AUTO-CAT-1783501582975" [ref=e167]
                    - cell "Trim Validation" [ref=e168]
                    - cell "1" [ref=e169]
                    - cell "2026-07-08 09:06:25 AM" [ref=e170]
                    - cell "Open menu" [ref=e171]:
                      - button "Open menu" [ref=e172] [cursor=pointer]:
                        - generic [ref=e173]: Open menu
                        - img [ref=e174]
                  - row "AUTO-CAT-1783547141153 Trim Validation 0 2026-07-08 09:45:42 PM Open menu" [ref=e178]:
                    - cell "AUTO-CAT-1783547141153" [ref=e179]
                    - cell "Trim Validation" [ref=e180]
                    - cell "0" [ref=e181]
                    - cell "2026-07-08 09:45:42 PM" [ref=e182]
                    - cell "Open menu" [ref=e183]:
                      - button "Open menu" [ref=e184] [cursor=pointer]:
                        - generic [ref=e185]: Open menu
                        - img [ref=e186]
                  - row "AUTO-CAT-1783585793608 Trim Validation 0 2026-07-09 08:29:54 AM Open menu" [ref=e190]:
                    - cell "AUTO-CAT-1783585793608" [ref=e191]
                    - cell "Trim Validation" [ref=e192]
                    - cell "0" [ref=e193]
                    - cell "2026-07-09 08:29:54 AM" [ref=e194]
                    - cell "Open menu" [ref=e195]:
                      - button "Open menu" [ref=e196] [cursor=pointer]:
                        - generic [ref=e197]: Open menu
                        - img [ref=e198]
                  - row "AUTO-CAT-1783590951574 Trim Validation 0 2026-07-09 09:55:53 AM Open menu" [ref=e202]:
                    - cell "AUTO-CAT-1783590951574" [ref=e203]
                    - cell "Trim Validation" [ref=e204]
                    - cell "0" [ref=e205]
                    - cell "2026-07-09 09:55:53 AM" [ref=e206]
                    - cell "Open menu" [ref=e207]:
                      - button "Open menu" [ref=e208] [cursor=pointer]:
                        - generic [ref=e209]: Open menu
                        - img [ref=e210]
                  - row "AUTO-CAT-1783620616425 Trim Validation 0 2026-07-09 06:10:17 PM Open menu" [ref=e214]:
                    - cell "AUTO-CAT-1783620616425" [ref=e215]
                    - cell "Trim Validation" [ref=e216]
                    - cell "0" [ref=e217]
                    - cell "2026-07-09 06:10:17 PM" [ref=e218]
                    - cell "Open menu" [ref=e219]:
                      - button "Open menu" [ref=e220] [cursor=pointer]:
                        - generic [ref=e221]: Open menu
                        - img [ref=e222]
                  - row "AUTO-CAT-1783647053642 Trim Validation 0 2026-07-10 01:30:54 AM Open menu" [ref=e226]:
                    - cell "AUTO-CAT-1783647053642" [ref=e227]
                    - cell "Trim Validation" [ref=e228]
                    - cell "0" [ref=e229]
                    - cell "2026-07-10 01:30:54 AM" [ref=e230]
                    - cell "Open menu" [ref=e231]:
                      - button "Open menu" [ref=e232] [cursor=pointer]:
                        - generic [ref=e233]: Open menu
                        - img [ref=e234]
                  - row "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Description 0 2026-07-07 04:21:10 PM Open menu" [ref=e238]:
                    - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" [ref=e239]
                    - cell "Description" [ref=e240]
                    - cell "0" [ref=e241]
                    - cell "2026-07-07 04:21:10 PM" [ref=e242]
                    - cell "Open menu" [ref=e243]:
                      - button "Open menu" [ref=e244] [cursor=pointer]:
                        - generic [ref=e245]: Open menu
                        - img [ref=e246]
                  - row "AUTO-CAT-1783441113207 Automation description 1783441113207 0 2026-07-07 04:18:36 PM Open menu" [ref=e250]:
                    - cell "AUTO-CAT-1783441113207" [ref=e251]
                    - cell "Automation description 1783441113207" [ref=e252]
                    - cell "0" [ref=e253]
                    - cell "2026-07-07 04:18:36 PM" [ref=e254]
                    - cell "Open menu" [ref=e255]:
                      - button "Open menu" [ref=e256] [cursor=pointer]:
                        - generic [ref=e257]: Open menu
                        - img [ref=e258]
                  - row "AUTO-CAT-1783441132320 Automation description 1783441132320 0 2026-07-07 04:18:55 PM Open menu" [ref=e262]:
                    - cell "AUTO-CAT-1783441132320" [ref=e263]
                    - cell "Automation description 1783441132320" [ref=e264]
                    - cell "0" [ref=e265]
                    - cell "2026-07-07 04:18:55 PM" [ref=e266]
                    - cell "Open menu" [ref=e267]:
                      - button "Open menu" [ref=e268] [cursor=pointer]:
                        - generic [ref=e269]: Open menu
                        - img [ref=e270]
              - generic [ref=e275]:
                - button "Previous" [disabled]:
                  - img
                  - generic: Previous
                - generic [ref=e276]:
                  - button "1" [ref=e277] [cursor=pointer]
                  - button "2" [ref=e278] [cursor=pointer]
                  - button "3" [ref=e279] [cursor=pointer]
                  - button "4" [ref=e280] [cursor=pointer]
                  - button "5" [ref=e281] [cursor=pointer]
                  - generic [ref=e282]: ...
                - button "Next" [ref=e283] [cursor=pointer]:
                  - generic [ref=e284]: Next
                  - img [ref=e285]
  - region "Notifications Alt+T"
  - region "Notifications alt+T"
```

# Test source

```ts
  941  |   
  942  |     await categoriesPage.createCategory(
  943  |       category.name,
  944  |       category.description
  945  |     );
  946  |   
  947  |     const firstRow =
  948  |       categoriesPage.table
  949  |         .locator("tbody tr")
  950  |         .first();
  951  |   
  952  |     await expect(
  953  |       firstRow
  954  |     ).toContainText(
  955  |       category.name
  956  |     );
  957  |   });
  958  |   
  959  |   // --------------------------------------------------
  960  |   // Refresh Persistence
  961  |   // --------------------------------------------------
  962  |   
  963  |   test("should persist created category after page refresh", async () => {
  964  |     const category =
  965  |       createCategory();
  966  |   
  967  |     await categoriesPage.createCategory(
  968  |       category.name,
  969  |       category.description
  970  |     );
  971  |   
  972  |     await categoriesPage.page.reload();
  973  |   
  974  |     await categoriesPage.waitForPageLoad();
  975  |   
  976  |     await expect(
  977  |       categoriesPage.getRowByName(
  978  |         category.name
  979  |       )
  980  |     ).toBeVisible();
  981  |   });
  982  |   
  983  |   // --------------------------------------------------
  984  |   // Search Persistence
  985  |   // --------------------------------------------------
  986  |   
  987  |   test("should clear search and restore full category list", async () => {
  988  |     const category =
  989  |       createCategory();
  990  |   
  991  |     await categoriesPage.createCategory(
  992  |       category.name,
  993  |       category.description
  994  |     );
  995  |   
  996  |     await categoriesPage.search(
  997  |       category.name
  998  |     );
  999  |   
  1000 |     await expect(
  1001 |       categoriesPage.getRowByName(
  1002 |         category.name
  1003 |       )
  1004 |     ).toBeVisible();
  1005 |   
  1006 |     await categoriesPage.searchInput.clear();
  1007 |   
  1008 |     await categoriesPage.searchInput.press(
  1009 |       "Enter"
  1010 |     );
  1011 |   
  1012 |     await expect(
  1013 |       categoriesPage.table
  1014 |         .locator("tbody tr")
  1015 |         .first()
  1016 |     ).toBeVisible();
  1017 |   });
  1018 |   
  1019 |   // --------------------------------------------------
  1020 |   // Regression
  1021 |   // --------------------------------------------------
  1022 |   
  1023 |   test("should not duplicate category after browser refresh", async () => {
  1024 |     const category =
  1025 |       createCategory();
  1026 |   
  1027 |     await categoriesPage.createCategory(
  1028 |       category.name,
  1029 |       category.description
  1030 |     );
  1031 |   
  1032 |     await categoriesPage.page.reload();
  1033 |   
  1034 |     const rows =
  1035 |       categoriesPage
  1036 |         .getRowByName(
  1037 |           category.name
  1038 |         );
  1039 |   
  1040 |     await expect(rows)
> 1041 |       .toHaveCount(1);
       |        ^ Error: expect(locator).toHaveCount(expected) failed
  1042 |   });
  1043 |   
  1044 |   test("should retain updated description after refresh", async () => {
  1045 |     const category =
  1046 |       createCategory();
  1047 |   
  1048 |     await categoriesPage.createCategory(
  1049 |       category.name,
  1050 |       category.description
  1051 |     );
  1052 |   
  1053 |     const updated =
  1054 |       `Updated-${Date.now()}`;
  1055 |   
  1056 |     await categoriesPage.editCategory(
  1057 |       category.name,
  1058 |       updated
  1059 |     );
  1060 |   
  1061 |     await categoriesPage.page.reload();
  1062 |   
  1063 |     const row =
  1064 |       await categoriesPage.getRowData(
  1065 |         category.name
  1066 |       );
  1067 |   
  1068 |     expect(
  1069 |       row.description
  1070 |     ).toContain(updated);
  1071 |   });
  1072 |   
  1073 |   // --------------------------------------------------
  1074 |   // API Integrity
  1075 |   // --------------------------------------------------
  1076 |   
  1077 |   test("should return correct payload after category creation", async () => {
  1078 |     const category =
  1079 |       createCategory();
  1080 |   
  1081 |     const response =
  1082 |       await categoriesPage.createCategory(
  1083 |         category.name,
  1084 |         category.description
  1085 |       );
  1086 |   
  1087 |     const body =
  1088 |       await response.json();
  1089 |   
  1090 |     expect(body.status).toBe(
  1091 |       "success"
  1092 |     );
  1093 |   
  1094 |     expect(
  1095 |       body.data.id
  1096 |     ).toBeDefined();
  1097 |   
  1098 |     expect(
  1099 |       body.data.name
  1100 |     ).toBe(category.name);
  1101 |   
  1102 |     expect(
  1103 |       body.data.description
  1104 |     ).toBe(
  1105 |       category.description
  1106 |     );
  1107 |   });
  1108 |   
  1109 |   test("should return updated payload after editing category", async () => {
  1110 |     const category =
  1111 |       createCategory();
  1112 |   
  1113 |     await categoriesPage.createCategory(
  1114 |       category.name,
  1115 |       category.description
  1116 |     );
  1117 |   
  1118 |     const updated =
  1119 |       `Automation-${Date.now()}`;
  1120 |   
  1121 |     const response =
  1122 |       await categoriesPage.editCategory(
  1123 |         category.name,
  1124 |         updated
  1125 |       );
  1126 |   
  1127 |     const body =
  1128 |       await response.json();
  1129 |   
  1130 |     expect(body.status).toBe(
  1131 |       "success"
  1132 |     );
  1133 |   
  1134 |     expect(
  1135 |       body.data.description
  1136 |     ).toBe(updated);
  1137 |   });
  1138 | });
```