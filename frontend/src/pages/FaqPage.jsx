import React, { useState } from 'react';
import '../style/faq.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
 
 

 
 
 
const FAQPage = () => {
  // State to manage which answer is currently open
  const [activeIndex, setActiveIndex] = useState(null);
 
  // Function to toggle answer visibility
  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Collapse if clicked again
    } else {
      setActiveIndex(index); // Expand clicked question
    }
  };
 
  // FAQ data with questions and answers
  const faqData = [
    {
      question: 'How do I rent supplies from EventRentify?',
      answer:
        'To rent supplies, browse our catalog, select the items you need, and add them to your cart. Proceed to checkout to confirm your rental.',
    },
    {
      question: 'What types of event supplies does EventRentify offer?',
      answer:
        'EventRentify offers a wide range of supplies including tables, chairs, tents, decorations, lighting, sound systems, and more. Browse our catalog for details.',
    },
    {
      question: 'Can I reserve supplies in advance?',
      answer:
        'Yes, you can reserve supplies in advance by selecting your event date during checkout. We recommend booking early to ensure availability.',
    },
    {
      question: 'What are your rental terms and conditions?',
      answer:
        'Our rental terms cover rental durations, deposit requirements, cancellation policies, and more. Please review our Terms and Conditions for detailed information.',
    },
    {
      question: 'Do you offer delivery and setup services?',
      answer:
        'Yes, we provide delivery, setup, and pickup services for your convenience. Additional fees may apply based on location and setup requirements.',
    },
    {
        question: 'How can I contact customer support for assistance?',
        answer:
          'For assistance, you can reach our customer support team via email at support@eventrentify.com or call us at Hotline Number.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept payments via Khalti transfer. Payments are processed securely through our website.',
      },
      {
        question: 'What if I need to cancel my rental order?',
        answer:
          'Please refer to our Cancellation Policy for information on cancellation fees and procedures. Contact us as soon as possible to cancel your order.',
      },
     
    
  ];
 
  return (
    <>
    <Navbar/>
    <div className='faq-faq'>
    <div className="faq-container">
      <h1 className="faq-heading">Frequently Asked Questions</h1>
  
      <div className="faq-content">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              {item.question}
              <span className="dropdown-icon">{activeIndex === index ? '▲' : '▼'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
 
     
    </div>
    </div>
<Footer/>
    </>
  );
};
 
export default FAQPage;
 