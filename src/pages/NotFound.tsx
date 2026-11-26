import React from 'react';
import {Link} from 'react-router-dom';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
export default function NotFound(){
  return <InnerPageBanner eyebrow="404" title="Page not found" sub="The page you’re looking for doesn’t exist or has moved."><Link className="btn gold" to="/">Back to home</Link></InnerPageBanner>;
}
