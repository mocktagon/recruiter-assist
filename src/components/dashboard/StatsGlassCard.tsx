import { LucideIcon } from "lucide-react";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";

interface StatsGlassCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'success' | 'neural';
  trend?: number[];
}

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case 'primary':
      return {
        cardClass: 'ai-glow',
        iconBg: 'bg-gradient-primary',
        valueColor: 'text-brand-primary',
        trendColor: 'stroke-brand-primary'
      };
    case 'secondary':
      return {
        cardClass: 'neural-glow',
        iconBg: 'bg-gradient-neural',
        valueColor: 'text-brand-secondary',
        trendColor: 'stroke-brand-secondary'
      };
    case 'success':
      return {
        cardClass: 'border-success/30',
        iconBg: 'bg-gradient-success',
        valueColor: 'text-success',
        trendColor: 'stroke-success'
      };
    case 'neural':
      return {
        cardClass: 'border-brand-neural/30',
        iconBg: 'bg-brand-neural',
        valueColor: 'text-brand-neural',
        trendColor: 'stroke-brand-neural'
      };
    default:
      return {
        cardClass: '',
        iconBg: 'bg-gradient-primary',
        valueColor: 'text-brand-primary',
        trendColor: 'stroke-brand-primary'
      };
  }
};

export function StatsGlassCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = 'primary',
  trend 
}: StatsGlassCardProps) {
  const styles = getVariantStyles(variant);
  
  return (
    <GlassCard className={`hover:scale-105 transition-all duration-300 ${styles.cardClass} group`}>
      <GlassCardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground-muted group-hover:text-foreground-ai transition-colors">
              {title}
            </p>
            <div className="space-y-1">
              <p className={`text-3xl font-bold ${styles.valueColor} group-hover:animate-ai-pulse`}>
                {value}
              </p>
              {change && (
                <p className={`text-xs flex items-center gap-1 ${
                  change.positive ? 'text-success' : 'text-error'
                }`}>
                  <span className={change.positive ? '↗' : '↘'}>{change.value}</span>
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className={`p-3 rounded-lg ${styles.iconBg} shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            
            {/* Mini trend chart */}
            {trend && (
              <div className="w-16 h-8">
                <svg viewBox="0 0 64 32" className="w-full h-full">
                  <polyline
                    points={trend.map((val, i) => `${(i * 64) / (trend.length - 1)},${32 - (val * 24)}`).join(' ')}
                    fill="none"
                    className={`${styles.trendColor} opacity-70`}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        
        {/* Subtle animation line */}
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent animate-neural-flow" />
      </GlassCardContent>
    </GlassCard>
  );
}