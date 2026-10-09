"use client";

import Image from "next/image";
import Link from "next/link";

function getCurrentDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default function Hero() {
  const currentDate = getCurrentDate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left side: Text content */}
        <div className="hero-content">
          <span className="hero-date">{currentDate}</span>

          <h1 className="hero-title">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="hero-description">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="hero-actions">
            <Link
              href="#সব-পণ্য"
              className="hero-button hero-button-primary"
            >
              সব পণ্যের দাম দেখুন
            </Link>

            <Link
              href="/signin"
              className="hero-button hero-button-secondary"
            >
              🛒 বাজার তুলনা
            </Link>
          </div>
        </div>

        {/* Right side: Vegetable basket image */}
        <div className="hero-visual">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের সবজির ঝুড়ি"
            width={300}
            height={240}
            priority
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}