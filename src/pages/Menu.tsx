// src/pages/Menu.tsx
import React from 'react';
import './styles/Menu.css';

const Menu: React.FC = () => {
  return (
    <div className="menu-container">
      <h1 className="menu-title">OUR MENU</h1>

      {/* Steaks */}
      <section className="menu-section">
        <h2>🥩 Steaks</h2>
        <ul>
          <li><strong>Ribeye Steak</strong> – Tender, juicy, and full of flavor. (€22.00)</li>
          <li><strong>Sirloin Steak</strong> – Lean cut with a bold beefy taste. (€19.00)</li>
          <li><strong>Filet Mignon</strong> – Extremely tender, melt-in-your-mouth. (€28.00)</li>
          <li><strong>New York Strip</strong> – Robust and satisfying. (€23.50)</li>
          <li><strong>T-Bone Steak</strong> – A carnivore’s delight. (€26.00)</li>
          <li><strong>Porterhouse</strong> – Perfect for sharing. (€29.00)</li>
          <li><strong>Flat Iron Steak</strong> – Juicy and well-marbled. (€17.50)</li>
          <li><strong>Tomahawk Steak</strong> – Bold and impressive. (€35.00)</li>
          <li><strong>Denver Steak</strong> – Richly marbled and tender. (€21.00)</li>
          <li><strong>Peppercorn-Crusted Steak</strong> – Served with creamy sauce. (€24.50)</li>
        </ul>
      </section>

      {/* Sides */}
      <section className="menu-section">
        <h2>🍟 Sides</h2>
        <ul>
          <li><strong>Garlic Mashed Potatoes</strong> – Creamy and comforting. (€5.50)</li>
          <li><strong>Grilled Asparagus</strong> – Lightly seasoned. (€4.00)</li>
          <li><strong>Steak Fries</strong> – Crispy perfection. (€4.50)</li>
          <li><strong>Mac & Cheese</strong> – Extra cheesy. (€5.00)</li>
          <li><strong>Sweet Potato Wedges</strong> – A sweet touch. (€4.75)</li>
          <li><strong>Coleslaw</strong> – Tangy and creamy. (€3.50)</li>
          <li><strong>Caesar Salad</strong> – Crunchy with parmesan. (€6.00)</li>
          <li><strong>Onion Rings</strong> – Golden and crispy. (€4.25)</li>
          <li><strong>Roasted Veggies</strong> – Olive oil glazed. (€4.90)</li>
          <li><strong>Baked Beans</strong> – Smoky and savory. (€3.75)</li>
        </ul>
      </section>

      {/* Burgers */}
      <section className="menu-section">
        <h2>🍔 Burgers</h2>
        <ul>
          <li><strong>Classic Cheeseburger</strong> – Cheddar, lettuce, tomato. (€9.50)</li>
          <li><strong>Bacon BBQ Burger</strong> – Bacon & smoky BBQ sauce. (€11.00)</li>
          <li><strong>Mushroom Swiss Burger</strong> – Savory mushrooms & swiss. (€10.00)</li>
          <li><strong>Double Steak Burger</strong> – Hearty & meaty. (€12.50)</li>
          <li><strong>Spicy Jalapeño Burger</strong> – With pepper jack. (€10.50)</li>
          <li><strong>Truffle Burger</strong> – With black truffle aioli. (€13.00)</li>
          <li><strong>Breakfast Burger</strong> – Egg, bacon, hashbrown. (€11.25)</li>
          <li><strong>Tex-Mex Burger</strong> – Salsa & avocado. (€10.75)</li>
          <li><strong>Smokehouse Burger</strong> – With crispy onions. (€11.95)</li>
          <li><strong>Mini Sliders (3)</strong> – Bite-sized trio. (€8.00)</li>
        </ul>
      </section>

      {/* Vegan Options */}
      <section className="menu-section">
        <h2>🥗 Vegan Options</h2>
        <ul>
          <li><strong>Grilled Tofu Steak</strong> – With chimichurri. (€10.50)</li>
          <li><strong>Vegan Burger</strong> – Black bean patty, avo. (€9.50)</li>
          <li><strong>Lentil Meatballs</strong> – Tomato basil sauce. (€8.75)</li>
          <li><strong>Stuffed Peppers</strong> – With quinoa & veg. (€9.00)</li>
          <li><strong>Vegan Mac & Cheese</strong> – Cashew-based. (€7.50)</li>
        </ul>
      </section>

      {/* Drinks */}
      <section className="menu-section">
        <h2>🥤 Drinks</h2>
        <ul>
          <li><strong>Sodas</strong> – Coke, Fanta, Sprite. (€2.00)</li>
          <li><strong>Milkshakes</strong> – Vanilla, Chocolate, Strawberry. (€3.50)</li>
          <li><strong>Iced Tea</strong> – Sweetened or unsweetened. (€2.75)</li>
          <li><strong>Lemonade</strong> – Freshly squeezed. (€2.80)</li>
          <li><strong>Bottled Water</strong> – Still or sparkling. (€1.50)</li>
        </ul>
      </section>

      {/* Kids Pack */}
      <section className="menu-section">
        <h2>🧒 Kids’ Pack</h2>
        <ul>
          <li><strong>Mini Cheeseburger + Fries + Juice</strong> (€7.00)</li>
          <li><strong>Chicken Nuggets + Apple Slices + Water</strong> (€6.50)</li>
          <li><strong>Grilled Cheese + Fruit Cup + Milk</strong> (€6.00)</li>
        </ul>
      </section>

      {/* Chef’s Specials */}
      <section className="menu-section">
        <h2>👨‍🍳 Chef’s Specials</h2>
        <ul>
          <li><strong>SteakZ Ultimate Platter</strong> – Ribeye, wings, sliders, fries. (€34.00)</li>
          <li><strong>Sunday Roast</strong> – Served with gravy, mash & peas. (€18.00)</li>
          <li><strong>Surf & Turf</strong> – Sirloin + Grilled Prawns. (€25.00)</li>
          <li><strong>SteakZ Secret Sauce Steak</strong> – House-special glaze. (€26.00)</li>
        </ul>
      </section>
    </div>
  );
};

export default Menu;