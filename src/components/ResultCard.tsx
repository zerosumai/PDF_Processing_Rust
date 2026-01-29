import { useState } from 'react';
import { CheckCircle, XCircle, FolderOpen, Copy, Check } from 'lucide-react';
import Button from './Button';

interface ResultCardProps {
  success: boolean;
  message: string;
  outputPath?: string;
  onOpenFolder?: () => void;
  onReset?: () => void;
  onCopyPath?: () => Promise<boolean>;
}

export default function ResultCard({
  success,
  message,
  outputPath,
  onOpenFolder,
  onReset,
  onCopyPath,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (onCopyPath) {
      const ok = await onCopyPath();
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div
      className={`rounded-2xl p-6 border animate-fade-in ${
        success
          ? 'bg-green-500/5 border-green-500/20'
          : 'bg-red-500/5 border-red-500/20'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            success ? 'bg-green-500/10' : 'bg-red-500/10'
          }`}
        >
          {success ? (
            <CheckCircle className="text-green-400" size={24} />
          ) : (
            <XCircle className="text-red-400" size={24} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold ${
              success ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {success ? '处理成功' : '处理失败'}
          </h3>
          <p className="text-zinc-400 text-sm mt-1">{message}</p>
          {outputPath && (
            <div className="flex items-center gap-2 mt-2">
              <p className="text-zinc-500 text-xs font-mono truncate flex-1">
                {outputPath}
              </p>
              {onCopyPath && (
                <button
                  onClick={handleCopy}
                  className="p-1 rounded hover:bg-[#2e2e38] text-zinc-500 hover:text-zinc-300 transition-colors flex-shrink-0"
                  title="复制路径"
                >
                  {copied ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-3 mt-4 pt-4 border-t border-[#2e2e38]">
        {success && onOpenFolder && (
          <Button
            variant="secondary"
            size="sm"
            icon={<FolderOpen size={16} />}
            onClick={onOpenFolder}
          >
            打开文件夹
          </Button>
        )}
        {onReset && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            重新开始
          </Button>
        )}
      </div>
    </div>
  );
}
