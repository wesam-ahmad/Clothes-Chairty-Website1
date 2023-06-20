import React from "react";

const FQAHome = () => {
  return (
    <div className="bg-services">
      <div>
        <section class="dark:bg-gray-800 dark:text-gray-100 py-6 ">
          <div class="container flex flex-col justify-center p-4 mx-auto md:p-8 my-5">
            <h2 class="mb-12 text-[#006E6A] text-3xl text-center font-bold my-5">
              الأسئلة الشائعة
            </h2>
            <div
              class="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700 my-8 "
              style={{ direction: "rtl" }}
            >
              <details className="mb-5">
                <summary class="py-2 bg-[#006E6A] text-white font-bold  outline-none cursor-pointer focus:underline ps-5">
                  ماهو مشروع وشاح الامل ؟
                </summary>
                <div class="px-4 pb-4">
                  <p>
                    الإجابة : وشاح الامل هو مشروع لإعادة تدوير الملابس المستعملة
                    وفرزها وتنظيفها وإعادة تهيئتها لتكون قابلة للاستخدام مرة
                    أخرى ويستفيد من ريعها الفقراء والمحتاجين , وهو مشروع معتمد
                    من الجمعيات الخيرية بالمملكة الأردنية الهاشمية
                  </p>
                </div>
              </details>
              <details className="mb-5">
                <summary class="py-2 bg-[#006E6A] text-white font-bold  outline-none cursor-pointer focus:underline ps-5">
                  ماذا يتم العمل بالملابس؟
                </summary>
                <div class="px-4 pb-4">
                  <p>
                    الإجابة : يتم فرز الملابس بحسب أصنافها وجودتها ويتم تسليمها
                    للجمعية .
                  </p>
                </div>
              </details>
              <details className="mb-5">
                <summary class="py-2 bg-[#006E6A] text-white font-bold  outline-none cursor-pointer focus:underline ps-5">
                  ماهو نوع الملابس الذي يتم استقبالها؟{" "}
                </summary>
                <div class="px-4 pb-4">
                  <p>
                    الإجابة : جميع أصناف الملابس بمختلف الجودات( الجديد و
                    المستتعمل بحالة جيدة و المستعمل بحالة متوسطة). .
                  </p>
                </div>
              </details>
              <details className="mb-5">
                <summary class="py-2 bg-[#006E6A] text-white font-bold  outline-none cursor-pointer focus:underline ps-5">
                  هل يتم قبول تبرعات غير الملابس؟{" "}
                </summary>
                <div class="px-4 pb-4">
                  <p>
                    {" "}
                    الإجابة : يتم قبول الشنط والجزم و الأحزمة وكل ما يتعلق
                    بالملابس .
                  </p>
                </div>
              </details>
              <details className="mb-5">
                <summary class="py-2 bg-[#006E6A] text-white font-bold  outline-none cursor-pointer focus:underline ps-5">
                  ماهي آلية العمل في وشاح الأمل؟{" "}
                </summary>
                <div class="px-4 pb-4">
                  <p>
                    نستقبل طلبات تبرعكم عبر موقعنا الإلكتروني نتواصل معكم لتأكيد
                    موعد الاستلام نصلكم في الوقت المحدد لاستلام الطلب نعمل على
                    فرز وإعادة تدوير تبرعاتكم يتم اعادة تدوير الملابس وايصالها
                    للمستحقين لتحقيق المنفعة لأكبر قدر منهم التسليم: يتم تسليم
                    الملابس للمستفيدي الجمعيات الخيرية
                  </p>
                </div>
              </details>
              <details className="mb-5">
                <summary class="py-2 bg-[#006E6A] text-white font-bold  outline-none cursor-pointer focus:underline ps-5">
                  كيف يمكنني المشاركة معكم في خيرك؟{" "}
                </summary>
                <div class="px-4 pb-4">
                  <p>
                    التبرع بالملابس (جميع أنواع الملابس، الأحذية، الحقائب،
                    الشراشف، الألحفة، الأقمشة) الوقت (تقدر تطوع بوقتك) المهارات
                    (التصوير، المونتاج، كتابة المحتوى، الخياطة، الأعمال
                    اليدوية…) خيرك سابق، شارك المشروع مع غيرك وكن سبباً في نشر
                    الوعي.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FQAHome;
