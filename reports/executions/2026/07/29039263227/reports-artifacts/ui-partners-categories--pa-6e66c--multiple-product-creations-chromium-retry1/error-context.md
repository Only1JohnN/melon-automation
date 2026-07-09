# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should display correct quantity after multiple product creations
- Location: tests/ui/partners/categories.spec.ts:746:7

# Error details

```
Error: locator.selectOption: Error: Element is not a <select> element
Call log:
  - waiting for getByRole('combobox', { name: /Category/i })
    - locator resolved to <button disabled type="button" role="combobox" data-state="closed" id=":r2h:-form-item" aria-invalid="false" aria-expanded="false" aria-haspopup="dialog" aria-controls="radix-:r2i:" aria-describedby=":r2h:-form-item-description" class="inline-flex items-center gap-2 whitespace-nowrap text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-95…>…</button>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - element is not enabled
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - element is not enabled
    - retrying select option action
      - waiting 100ms
    2 × waiting for element to be visible and enabled
      - element is not enabled
    - retrying select option action
      - waiting 500ms
    - waiting for element to be visible and enabled

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
            - /url: /inventory/products/new
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
            - img [ref=e53]
        - link [ref=e62] [cursor=pointer]:
          - /url: /transactions
          - img [ref=e64]
        - generic [ref=e69]:
          - link [ref=e70] [cursor=pointer]:
            - /url: /settings/profile
            - img [ref=e72]
          - link [ref=e75]:
            - /url: /inventory/products/new
            - img [ref=e77]
      - button [ref=e84] [cursor=pointer]:
        - img [ref=e88]
    - generic [ref=e89]:
      - generic [ref=e92]:
        - button "9+" [ref=e93] [cursor=pointer]:
          - img [ref=e94]
          - generic [ref=e97]: 9+
        - button [ref=e98] [cursor=pointer]:
          - img [ref=e102]
      - main [ref=e103]:
        - generic [ref=e105]:
          - navigation [ref=e106]
          - main [ref=e107]:
            - generic [ref=e108]:
              - generic [ref=e109]:
                - button [ref=e110] [cursor=pointer]:
                  - img [ref=e111]
                - generic [ref=e113]:
                  - heading "Add Product" [level=1] [ref=e114]
                  - paragraph [ref=e115]: Add what you are selling to your inventory for customers to see both online and physically
              - generic [ref=e116]:
                - button "Preview" [ref=e117] [cursor=pointer]
                - button "Add Product" [ref=e118] [cursor=pointer]
            - generic [ref=e121]:
              - generic [ref=e124]:
                - generic [ref=e125]:
                  - paragraph [ref=e126]: Product Details
                  - generic [ref=e127]:
                    - generic [ref=e128]:
                      - generic [ref=e129]: Product name*
                      - textbox "Product name*" [ref=e130]:
                        - /placeholder: Enter the name of your product
                    - generic [ref=e132]:
                      - text: Product description (Optional)
                      - generic [ref=e135]:
                        - generic [ref=e136]:
                          - combobox [ref=e137] [cursor=pointer]:
                            - generic:
                              - generic:
                                - img
                                - text: Paragraph
                            - img [ref=e138]
                          - combobox [ref=e140]
                          - button "Undo" [disabled] [ref=e142]:
                            - img [ref=e143]
                          - button "Redo" [disabled] [ref=e146]:
                            - img [ref=e147]
                          - button "Format Bold" [ref=e151] [cursor=pointer]:
                            - img [ref=e152]
                          - button "Format Italics" [ref=e154] [cursor=pointer]:
                            - img [ref=e155]
                          - button "Format Underline" [ref=e157] [cursor=pointer]:
                            - img [ref=e158]
                          - button "Format Strikethrough" [ref=e160] [cursor=pointer]:
                            - img [ref=e161]
                          - button "Left Align" [ref=e165] [cursor=pointer]:
                            - img [ref=e166]
                          - button "Center Align" [ref=e167] [cursor=pointer]:
                            - img [ref=e168]
                          - button "Right Align" [ref=e169] [cursor=pointer]:
                            - img [ref=e170]
                          - button "Justify Align" [ref=e171] [cursor=pointer]:
                            - img [ref=e172]
                          - button "Insert Image" [ref=e174] [cursor=pointer]:
                            - img [ref=e175]
                        - generic [ref=e179]:
                          - textbox [active] [ref=e180]:
                            - paragraph [ref=e181]
                          - generic: Describe your product
                    - generic [ref=e182]:
                      - generic [ref=e183]: Category
                      - combobox "Category" [ref=e184] [cursor=pointer]:
                        - generic [ref=e185]: Select category
                        - img [ref=e186]
                - generic [ref=e188]:
                  - paragraph [ref=e189]: Pricing & Profit
                  - generic [ref=e191]:
                    - generic [ref=e192]:
                      - generic [ref=e193]:
                        - text: Selling Price
                        - textbox "Selling Price" [ref=e194]:
                          - /placeholder: Enter the price
                      - paragraph [ref=e195]: VAT will be added to prices when product is saved so that you can view it in the preview as well.
                    - generic [ref=e196]:
                      - button "Promo Price (Optional)" [ref=e198] [cursor=pointer]:
                        - text: Promo Price (Optional)
                        - img [ref=e199]
                      - textbox "Promo Price (Optional)" [ref=e201]:
                        - /placeholder: Enter promo price
                    - generic [ref=e203]:
                      - text: Cost Price
                      - textbox "Cost Price" [ref=e204]:
                        - /placeholder: Enter the cost price
                    - generic [ref=e205]:
                      - generic [ref=e206]: Profit
                      - textbox "Profit" [ref=e207]: ₦0
                    - generic [ref=e208]:
                      - generic [ref=e209]: Margin (%)
                      - textbox "Margin" [ref=e210]: "0.00"
                    - generic [ref=e212]:
                      - button "Charge Taxes" [ref=e214] [cursor=pointer]:
                        - text: Charge Taxes
                        - img [ref=e215]
                      - textbox "Charge Taxes" [disabled] [ref=e217]: VAT INCLUSIVE
                - generic [ref=e218]:
                  - paragraph [ref=e219]: Product Inventory
                  - generic [ref=e220]:
                    - generic [ref=e221]:
                      - generic [ref=e222]:
                        - text: Stock Quantity
                        - spinbutton "Stock Quantity" [ref=e223]
                      - generic [ref=e224]:
                        - checkbox "Enable Low Stock Alert" [ref=e225]
                        - generic [ref=e226]: Enable Low Stock Alert
                    - generic [ref=e227]:
                      - text: SKU
                      - textbox "SKU" [disabled] [ref=e228]:
                        - /placeholder: Enter Product SKU
                        - text: 19A8MRDU9UQ8000
                - generic [ref=e230]:
                  - generic [ref=e231]: Does this product have variations like sizes and colours?
                  - radiogroup [ref=e234]:
                    - generic [ref=e235]:
                      - radio "No, it doesn't" [checked] [ref=e236] [cursor=pointer]:
                        - img [ref=e238]
                      - radio [checked]
                      - generic [ref=e240] [cursor=pointer]:
                        - img [ref=e242]
                        - generic [ref=e244]: No, it doesn't
                    - generic [ref=e245]:
                      - radio "Yes it has" [ref=e246] [cursor=pointer]
                      - radio
                      - generic [ref=e249] [cursor=pointer]: Yes it has
                - generic [ref=e250]:
                  - paragraph [ref=e251]: Product Allocation
                  - generic [ref=e252]:
                    - generic [ref=e255]:
                      - generic [ref=e256]:
                        - text: Select product location
                        - combobox "Select product location" [ref=e257] [cursor=pointer]:
                          - generic: Select a branch
                          - img [ref=e258]
                        - combobox [ref=e260]
                      - generic [ref=e261]:
                        - text: Assign Quantity
                        - generic [ref=e262] [cursor=pointer]:
                          - generic [ref=e263]: No products assigned
                          - img [ref=e264]
                    - button "Select more locations" [ref=e266] [cursor=pointer]:
                      - img [ref=e267]
                      - text: Select more locations
              - button "Add Product Image Click to upload image" [ref=e270] [cursor=pointer]:
                - img [ref=e272]
                - generic [ref=e276]:
                  - paragraph [ref=e277]: Add Product Image
                  - paragraph [ref=e278]: Click to upload image
  - region "Notifications Alt+T"
  - region "Notifications alt+T"
```

# Test source

```ts
  701 |       })
  702 |       .click();
  703 |   
  704 |     const response =
  705 |       await createProduct;
  706 |   
  707 |     expect(
  708 |       response.status()
  709 |     ).toBe(201);
  710 |   
  711 |     await categoriesPage.goto();
  712 |   
  713 |     const updatedQuantity =
  714 |       await categoriesPage.getQuantity(
  715 |         category.name
  716 |       );
  717 |   
  718 |     expect(
  719 |       updatedQuantity
  720 |     ).toBeGreaterThan(
  721 |       initialQuantity
  722 |     );
  723 |   });
  724 |   
  725 |   // --------------------------------------------------
  726 |   // Quantity Integrity
  727 |   // --------------------------------------------------
  728 |   
  729 |   test("should keep quantity at zero when category has no products", async () => {
  730 |     const category =
  731 |       createCategory();
  732 |   
  733 |     await categoriesPage.createCategory(
  734 |       category.name,
  735 |       category.description
  736 |     );
  737 |   
  738 |     const quantity =
  739 |       await categoriesPage.getQuantity(
  740 |         category.name
  741 |       );
  742 |   
  743 |     expect(quantity).toBe(0);
  744 |   });
  745 |   
  746 |   test("should display correct quantity after multiple product creations", async ({
  747 |     page,
  748 |   }) => {
  749 |     const category =
  750 |       createCategory();
  751 |   
  752 |     await categoriesPage.createCategory(
  753 |       category.name,
  754 |       category.description
  755 |     );
  756 |   
  757 |     for (
  758 |       let i = 0;
  759 |       i < 2;
  760 |       i++
  761 |     ) {
  762 |       await page.goto(
  763 |         `${process.env.PARTNER_URL}/inventory/products`
  764 |       );
  765 |   
  766 |       await page.getByRole(
  767 |         "button",
  768 |         {
  769 |           name:
  770 |             "Add Product",
  771 |         }
  772 |       ).click();
  773 |   
  774 |       await page.getByRole(
  775 |         "button",
  776 |         {
  777 |           name:
  778 |             "Single Product",
  779 |         }
  780 |       ).click();
  781 |   
  782 |       await page
  783 |         .getByRole(
  784 |           "textbox",
  785 |           {
  786 |             name: /Product name/i,
  787 |           }
  788 |         )
  789 |         .fill(
  790 |           `AUTO-${Date.now()}-${i}`
  791 |         );
  792 |   
  793 |       await page
  794 |         .getByRole(
  795 |           "combobox",
  796 |           {
  797 |             name:
  798 |               /Category/i,
  799 |           }
  800 |         )
> 801 |         .selectOption({
      |          ^ Error: locator.selectOption: Error: Element is not a <select> element
  802 |           label:
  803 |             category.name,
  804 |         });
  805 |   
  806 |       await page
  807 |         .getByRole(
  808 |           "spinbutton",
  809 |           {
  810 |             name:
  811 |               /Cost Price/i,
  812 |           }
  813 |         )
  814 |         .fill("1000");
  815 |   
  816 |       await page
  817 |         .getByRole(
  818 |           "spinbutton",
  819 |           {
  820 |             name:
  821 |               /Selling Price/i,
  822 |           }
  823 |         )
  824 |         .fill("1500");
  825 |   
  826 |       await page
  827 |         .getByRole(
  828 |           "spinbutton",
  829 |           {
  830 |             name:
  831 |               /Stock Quantity/i,
  832 |           }
  833 |         )
  834 |         .fill("10");
  835 |   
  836 |       await Promise.all([
  837 |         page.waitForResponse(
  838 |           response =>
  839 |             response
  840 |               .url()
  841 |               .includes(
  842 |                 "/products"
  843 |               ) &&
  844 |             response.request().method() ===
  845 |               "POST"
  846 |         ),
  847 |         page
  848 |           .getByRole(
  849 |             "button",
  850 |             {
  851 |               name:
  852 |                 /Add Product/i,
  853 |               exact: true,
  854 |             }
  855 |           )
  856 |           .click(),
  857 |       ]);
  858 |     }
  859 |   
  860 |     await categoriesPage.goto();
  861 |   
  862 |     const quantity =
  863 |       await categoriesPage.getQuantity(
  864 |         category.name
  865 |       );
  866 |   
  867 |     expect(
  868 |       quantity
  869 |     ).toBeGreaterThanOrEqual(
  870 |       2
  871 |     );
  872 |   });
  873 |   
  874 |   // --------------------------------------------------
  875 |   // Top Category Widget
  876 |   // --------------------------------------------------
  877 |   
  878 |   test("should display category with highest quantity as Top Category", async ({
  879 |     page,
  880 |   }) => {
  881 |     const category =
  882 |       createCategory();
  883 |   
  884 |     await categoriesPage.createCategory(
  885 |       category.name,
  886 |       category.description
  887 |     );
  888 |   
  889 |     // create several products here
  890 |     // (reuse your ProductPage helper instead)
  891 |   
  892 |     await categoriesPage.goto();
  893 |   
  894 |     const top =
  895 |       await categoriesPage.getTopCategoryInfo();
  896 |   
  897 |     expect(top.name).toBe(
  898 |       category.name
  899 |     );
  900 |   
  901 |     expect(
```