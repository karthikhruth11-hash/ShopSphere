import React, { useState, useRef, useEffect } from 'react';

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      type: 'ai_formatted',
      title: '👋 Welcome to ShopSphere AI Assistant!',
      text: "I am your personal AI shopping companion. Ask me anything about our **Trending Products**, **Cosmetics & Skincare**, **Girls' & Boys' Collections**, or **Special Discounts**!"
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // AI Logic Engine with Rich Formatting & Structured Answers
  const generateAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    if (q.includes('trending') || q.includes('gadget') || q.includes('headphone') || q.includes('watch')) {
      return {
        title: '🔥 Hot Trending Collection Highlights',
        items: [
          '🎧 **Active Noise-Cancelling Headphones** — $129.99 (40h battery, Spatial Audio ★4.9)',
          '⌚ **Smart OLED Fitness Tracker** — $69.99 (Waterproof, Heart & Sleep Tracker ★4.8)',
          '🕰️ **Minimalist Leather Smartwatch** — $149.00 (Italian leather, Wireless charging ★4.7)'
        ],
        footer: '💡 *Tip: Click on the Trending tab in the top menu to browse all items!*'
      };
    }

    if (q.includes('cosmetic') || q.includes('makeup') || q.includes('serum') || q.includes('skin')) {
      return {
        title: '💄 Premium Cosmetics & Skincare Favorites',
        items: [
          '💋 **Velvet Matte Liquid Lipstick Trio** — $28.99 (24h Waterproof formula ★4.9)',
          '✨ **Botanical Hyaluronic Glow Serum** — $38.50 (Organic Vitamin C & Rosehip ★4.9)',
          '🎨 **Rose Gold Eyeshadow Palette** — $32.00 (16 Metallic & Matte Pigmented Shades ★4.8)',
          '🧴 **Luminous Silk Foundation** — $42.00 (Lightweight Medium Coverage with SPF 20 ★4.7)'
        ],
        footer: '🌿 *All cosmetics are 100% cruelty-free, dermatologist tested & vegan-friendly!*'
      };
    }

    if (q.includes('girl') || q.includes('dress') || q.includes('skirt') || q.includes('gown')) {
      return {
        title: '👧 Girls Collection & Apparel Guide',
        items: [
          '👗 **Floral Summer Chiffon Dress** — $44.99 (Breathable cotton lining ★4.9)',
          '🧥 **Vintage Denim Jacket & Tutu Dress** — $49.99 (Soft tulle princess skirt ★4.8)',
          '👑 **Pastel Rainbow Party Gown** — $54.00 (Satin ribbon waist accent ★5.0)',
          '🧶 **Soft Knit Cardigan & Skirt Set** — $36.50 (Hypoallergenic cozy yarn ★4.7)'
        ],
        footer: '📏 *Girls Size Guide: Available in standard sizes 2T to 14Y.*'
      };
    }

    if (q.includes('boy') || q.includes('shirt') || q.includes('hoodie') || q.includes('suit') || q.includes('jean')) {
      return {
        title: '👦 Boys Collection & Urban Style Guide',
        items: [
          '👔 **Classic Flannel Checkered Shirt** — $29.99 (100% Combed Cotton ★4.8)',
          '🧥 **Streetwear Fleece Graphic Hoodie** — $34.99 (Warm fleece lining ★4.9)',
          '🤵 **Smart Formal Tuxedo 3-Piece Suit** — $69.99 (Blazer, vest & trousers ★4.9)',
          '👖 **Urban Cargo Stretch Jeans** — $32.00 (Multi-pocket utility style ★4.7)'
        ],
        footer: '📏 *Boys Size Guide: Available in XS (4Y) to XL (16Y).*'
      };
    }

    if (q.includes('coupon') || q.includes('offer') || q.includes('discount') || q.includes('promo')) {
      return {
        title: '🏷️ Exclusive Active Discount Coupons',
        items: [
          '🎟️ **SAVE10** — Get 10% OFF on orders over $30',
          '🎁 **WELCOME20** — Get 20% OFF your first purchase',
          '🚚 **FREESHIP** — Free Express Shipping on orders over $50'
        ],
        footer: '💳 *Enter these coupon codes in your Shopping Cart Drawer before checkout!*'
      };
    }

    if (q.includes('ship') || q.includes('delivery') || q.includes('track') || q.includes('return')) {
      return {
        title: '🚚 Shipping & Hassle-Free Returns Policy',
        items: [
          '📦 **Standard Shipping**: 3 - 5 business days (Free over $50)',
          '⚡ **Express Shipping**: 1 - 2 business days ($9.99)',
          '🔄 **30-Day Guarantee**: Easy hassle-free returns within 30 days of delivery'
        ],
        footer: '🛡️ *Every order comes with full end-to-end tracking & package protection.*'
      };
    }

    return {
      title: '🤖 ShopSphere AI Shopping Guide',
      items: [
        '✨ Try asking me: *"Show me cosmetics deals"*, *"Recommend girls dresses"*, *"What are the trending boys hoodies?"*, or *"Give me active coupon codes"*!'
      ],
      footer: '💬 *I am ready to assist you with any questions!*'
    };
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseObj = generateAIResponse(query);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          type: 'ai_formatted',
          title: responseObj.title,
          items: responseObj.items,
          footer: responseObj.footer
        }
      ]);
    }, 600);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const quickPrompts = [
    '🔥 Trending Items',
    '💄 Cosmetics & Glow',
    '👧 Girls Dresses',
    '👦 Boys Apparel',
    '🏷️ Active Coupons',
    '🚚 Shipping & Returns'
  ];

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 3000 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '0.85rem 1.4rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.95rem',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: '1.2rem' }}>🤖</span>
          <span>AI Support Chat</span>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
            display: 'inline-block'
          }} />
        </button>
      ) : (
        <div style={{
          width: '380px',
          maxWidth: '92vw',
          height: '520px',
          maxHeight: '80vh',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 15px 35px rgba(15, 23, 42, 0.22)',
          overflow: 'hidden'
        }}>
          {/* AI Header */}
          <div style={{
            padding: '1rem 1.25rem',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb 0%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                🤖
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>ShopSphere AI Assistant</div>
                <div style={{ fontSize: '0.72rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }}></span> Online & Ready
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setMessages([messages[0]])}
                title="Clear Chat"
                style={{ background: 'none', color: '#cbd5e1', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', color: '#ffffff', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Prompts Chip Bar */}
          <div style={{
            display: 'flex',
            gap: '0.4rem',
            padding: '0.6rem 0.8rem',
            overflowX: 'auto',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0'
          }}>
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  color: '#1e293b'
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            backgroundColor: '#f8fafc'
          }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  backgroundColor: m.sender === 'user' ? '#2563eb' : '#ffffff',
                  color: m.sender === 'user' ? '#ffffff' : '#0f172a',
                  padding: '0.85rem 1rem',
                  borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  boxShadow: m.sender === 'user' ? '0 4px 12px rgba(37,99,235,0.2)' : '0 2px 8px rgba(0,0,0,0.06)',
                  border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                  fontSize: '0.88rem',
                  lineHeight: '1.5'
                }}
              >
                {m.sender === 'user' ? (
                  <span>{m.text}</span>
                ) : (
                  <div>
                    {m.title && (
                      <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#2563eb', fontSize: '0.92rem' }}>
                        {m.title}
                      </div>
                    )}
                    {m.text && <div>{m.text}</div>}
                    {m.items && (
                      <ul style={{ paddingLeft: '1.2rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {m.items.map((item, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                      </ul>
                    )}
                    {m.footer && (
                      <div style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic', borderTop: '1px dashed #e2e8f0', paddingTop: '0.4rem' }}>
                        {m.footer}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '0.6rem 0.9rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span>🤖 ShopSphere AI is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Bar with Enter Button */}
          <form
            onSubmit={handleFormSubmit}
            style={{
              display: 'flex',
              padding: '0.6rem 0.75rem',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              gap: '0.5rem',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '0.65rem 0.9rem',
                outline: 'none',
                fontSize: '0.88rem'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.65rem 0.95rem',
                background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}
            >
              Enter ↵
            </button>
          </form>
        </div>
      )}
    </div>
  );
}