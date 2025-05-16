import { Link, Text } from '@zigurous/forge-react';
import React from 'react';
import '../styles/footer-bar.css';

export default function FooterBar() {
  return (
    <footer className="footer-bar">
      <div className="flex align-center">
        <Text className="mx-xs" color="muted" type="caption">
          Copyright © {new Date().getUTCFullYear()}{' '}
          <a className="underline" href="https://zigurous.com" target="_blank">
            Zigurous
          </a>
        </Text>
        <Text className="mx-xs" color="muted" type="caption">
          <a
            className="underline"
            href="https://zigurous.com/terms-of-service"
            target="_blank"
          >
            Terms of Use
          </a>
        </Text>
        <Text className="mx-xs" color="muted" type="caption">
          <a
            className="underline"
            href="https://zigurous.com/privacy-policy"
            target="_blank"
          >
            Privacy Policy
          </a>
        </Text>
      </div>
      <div className="flex align-center">
        <Text className="mx-xs" color="muted" type="caption">
          Thank you to{' '}
          <a
            className="underline"
            href="https://oldschool.runescape.wiki/"
            target="_blank"
          >
            OSRS Wiki
          </a>
        </Text>
        <Text className="mx-xs" color="muted" type="caption">
          <i>RuneScape Old School</i> is a trademark of{' '}
          <a
            className="underline"
            href="https://www.jagex.com/"
            target="_blank"
          >
            Jagex Limited
          </a>
        </Text>
      </div>
    </footer>
  );
}
