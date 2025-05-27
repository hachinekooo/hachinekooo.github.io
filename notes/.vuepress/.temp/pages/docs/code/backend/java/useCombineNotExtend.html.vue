<template><div><p>例子：电子商务订单处理系统
1.	支付方式类（支付宝、微信支付、信用卡支付）</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>// 支付接口</span></span>
<span class="line"><span>interface PaymentMethod {</span></span>
<span class="line"><span>    void pay(double amount);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 支付宝支付</span></span>
<span class="line"><span>class Alipay implements PaymentMethod {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void pay(double amount) {</span></span>
<span class="line"><span>        System.out.println("Paying " + amount + " using Alipay.");</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 微信支付</span></span>
<span class="line"><span>class WeChatPay implements PaymentMethod {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void pay(double amount) {</span></span>
<span class="line"><span>        System.out.println("Paying " + amount + " using WeChat Pay.");</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 信用卡支付</span></span>
<span class="line"><span>class CreditCard implements PaymentMethod {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void pay(double amount) {</span></span>
<span class="line"><span>        System.out.println("Paying " + amount + " using Credit Card.");</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>	2.	物流类（快递、送货上门）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>// 物流接口</span></span>
<span class="line"><span>interface ShippingMethod {</span></span>
<span class="line"><span>    void ship(String address);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 快递</span></span>
<span class="line"><span>class ExpressShipping implements ShippingMethod {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void ship(String address) {</span></span>
<span class="line"><span>        System.out.println("Shipping to " + address + " via Express Shipping.");</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 送货上门</span></span>
<span class="line"><span>class HomeDelivery implements ShippingMethod {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void ship(String address) {</span></span>
<span class="line"><span>        System.out.println("Delivering to " + address + " via Home Delivery.");</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>	3.	订单类（通过组合支付和物流功能扩展订单功能）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 订单类</span></span>
<span class="line"><span>class Order {</span></span>
<span class="line"><span>    private PaymentMethod paymentMethod;</span></span>
<span class="line"><span>    private ShippingMethod shippingMethod;</span></span>
<span class="line"><span>    private double amount;</span></span>
<span class="line"><span>    private String deliveryAddress;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 通过构造函数组合支付方式和物流方式</span></span>
<span class="line"><span>    public Order(PaymentMethod paymentMethod, ShippingMethod shippingMethod, double amount, String deliveryAddress) {</span></span>
<span class="line"><span>        this.paymentMethod = paymentMethod;</span></span>
<span class="line"><span>        this.shippingMethod = shippingMethod;</span></span>
<span class="line"><span>        this.amount = amount;</span></span>
<span class="line"><span>        this.deliveryAddress = deliveryAddress;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 处理订单</span></span>
<span class="line"><span>    void processOrder() {</span></span>
<span class="line"><span>        paymentMethod.pay(amount);           // 先支付</span></span>
<span class="line"><span>        shippingMethod.ship(deliveryAddress); // 再发货</span></span>
<span class="line"><span>        System.out.println("Order processed successfully!");</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>4.	使用订单类处理订单
</code></pre>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>public class Main {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        // 选择支付方式和物流方式</span></span>
<span class="line"><span>        PaymentMethod paymentMethod = new Alipay();  // 选择支付宝支付</span></span>
<span class="line"><span>        ShippingMethod shippingMethod = new ExpressShipping();  // 选择快递物流</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建订单并处理</span></span>
<span class="line"><span>        Order order = new Order(paymentMethod, shippingMethod, 199.99, "123 Main Street, City");</span></span>
<span class="line"><span>        order.processOrder();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        System.out.println("---");</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 换一个支付方式和物流方式</span></span>
<span class="line"><span>        paymentMethod = new CreditCard();  // 选择信用卡支付</span></span>
<span class="line"><span>        shippingMethod = new HomeDelivery();  // 选择送货上门物流</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建新的订单并处理</span></span>
<span class="line"><span>        order = new Order(paymentMethod, shippingMethod, 99.99, "456 Elm Street, City");</span></span>
<span class="line"><span>        order.processOrder();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<h2 id="paying-199-99-using-alipay-shipping-to-123-main-street-city-via-express-shipping-order-processed-successfully" tabindex="-1"><a class="header-anchor" href="#paying-199-99-using-alipay-shipping-to-123-main-street-city-via-express-shipping-order-processed-successfully"><span>Paying 199.99 using Alipay.
Shipping to 123 Main Street, City via Express Shipping.
Order processed successfully!</span></a></h2>
<p>Paying 99.99 using Credit Card.
Delivering to 456 Elm Street, City via Home Delivery.
Order processed successfully!</p>
<p>解释</p>
<p>在这个例子中，我们通过在 Order 类中组合了 PaymentMethod 和 ShippingMethod 接口的不同实现类，来处理不同的支付方式和物流方式。每个订单可以灵活地选择不同的支付方式（例如支付宝、微信支付、信用卡）和物流方式（例如快递、送货上门），而不需要在 Order 类中硬编码所有的支付和物流逻辑。</p>
<p>这种组合方法有以下优点：
1.	灵活扩展：我们可以轻松地添加新的支付方式或物流方式，只需要实现相应的接口，并将其传递给 Order 类即可。例如，添加 PayPal 支付方式和 DroneShipping 快递方式都非常简单。
2.	高内聚低耦合：每个类专注于单一的功能（支付、物流等），它们的实现相互独立，符合单一职责原则和松耦合原则。
3.	避免复杂继承：通过组合来扩展功能，而不是通过继承，避免了复杂的继承体系，使代码更加清晰和易于维护。
4.	开闭原则：在不修改现有代码的情况下，我们可以通过新增支付方式或物流方式来扩展订单处理功能，从而遵循开闭原则。</p>
<p>通过组合，Order 类变得非常灵活，可以根据需要动态地组合不同的支付和物流方式，满足不同业务需求</p>
</div></template>


