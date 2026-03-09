'use client';
import { useState, useCallback } from 'react';
import styles from '@/styles/calculator.module.css';

interface HistoryItem {
  expression: string;
  result: string;
}

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const inputDigit = useCallback((digit: string) => {
    if (hasResult) {
      setDisplay(digit);
      setExpression('');
      setHasResult(false);
      setWaitingForOperand(false);
      return;
    }
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }, [display, waitingForOperand, hasResult]);

  const inputDecimal = useCallback(() => {
    if (hasResult) {
      setDisplay('0.');
      setExpression('');
      setHasResult(false);
      setWaitingForOperand(false);
      return;
    }
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand, hasResult]);

  const inputOperator = useCallback((op: string) => {
    setExpression(display + ' ' + op);
    setWaitingForOperand(true);
    setHasResult(false);
  }, [display]);

  const calculate = useCallback(() => {
    if (!expression) return;
    try {
      const parts = expression.trim().split(' ');
      const left = parseFloat(parts[0]);
      const operator = parts[1];
      const right = parseFloat(display);
      let result: number;
      switch (operator) {
        case '+': result = left + right; break;
        case '−': result = left - right; break;
        case '×': result = left * right; break;
        case '÷':
          if (right === 0) {
            setDisplay('Error');
            setExpression('');
            setWaitingForOperand(false);
            setHasResult(true);
            return;
          }
          result = left / right;
          break;
        case '%': result = left * (right / 100); break;
        default: return;
      }
      const resultStr = Number.isInteger(result)
        ? result.toString()
        : parseFloat(result.toFixed(10)).toString();
      const fullExpr = expression + ' ' + display + ' =';
      setHistory((prev) => [{ expression: fullExpr, result: resultStr }, ...prev.slice(0, 9)]);
      setDisplay(resultStr);
      setExpression(fullExpr);
      setHasResult(true);
      setWaitingForOperand(false);
    } catch {
      setDisplay('Error');
      setExpression('');
      setHasResult(true);
    }
  }, [display, expression]);

  const percentage = useCallback(() => {
    const value = parseFloat(display);
    if (!isNaN(value)) {
      const result = value / 100;
      setDisplay(result.toString());
      setHasResult(false);
    }
  }, [display]);

  const toggleSign = useCallback(() => {
    const value = parseFloat(display);
    if (!isNaN(value)) {
      setDisplay((-value).toString());
    }
  }, [display]);

  const clear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setWaitingForOperand(false);
    setHasResult(false);
  }, []);

  const backspace = useCallback(() => {
    if (hasResult || display === 'Error') {
      clear();
      return;
    }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display, hasResult, clear]);

  const buttons: Array<{ label: string; action: () => void; type: string; wide?: boolean }> = [
    { label: 'AC', action: clear, type: 'clear' },
    { label: '+/-', action: toggleSign, type: 'operator' },
    { label: '%', action: percentage, type: 'operator' },
    { label: '÷', action: () => inputOperator('÷'), type: 'operator' },

    { label: '7', action: () => inputDigit('7'), type: 'number' },
    { label: '8', action: () => inputDigit('8'), type: 'number' },
    { label: '9', action: () => inputDigit('9'), type: 'number' },
    { label: '×', action: () => inputOperator('×'), type: 'operator' },

    { label: '4', action: () => inputDigit('4'), type: 'number' },
    { label: '5', action: () => inputDigit('5'), type: 'number' },
    { label: '6', action: () => inputDigit('6'), type: 'number' },
    { label: '−', action: () => inputOperator('−'), type: 'operator' },

    { label: '1', action: () => inputDigit('1'), type: 'number' },
    { label: '2', action: () => inputDigit('2'), type: 'number' },
    { label: '3', action: () => inputDigit('3'), type: 'number' },
    { label: '+', action: () => inputOperator('+'), type: 'operator' },

    { label: '⌫', action: backspace, type: 'backspace' },
    { label: '0', action: () => inputDigit('0'), type: 'number' },
    { label: '.', action: inputDecimal, type: 'number' },
    { label: '=', action: calculate, type: 'equals' },
  ];

  const getButtonClass = (type: string) => {
    const map: Record<string, string> = {
      number: styles.btnNumber,
      operator: styles.btnOperator,
      equals: styles.btnEquals,
      clear: styles.btnClear,
      backspace: styles.btnBackspace,
    };
    return `${styles.btn} ${map[type] || styles.btnNumber}`;
  };

  return (
    <div className={styles.calculatorWrapper}>
      <div className={styles.calculator}>
        <div className={styles.display}>
          <div className={styles.expression}>{expression || '\u00A0'}</div>
          <div className={`${styles.value} ${hasResult ? styles.hasResult : ''}`}>
            {display.length > 12 ? parseFloat(display).toExponential(6) : display}
          </div>
        </div>
        <div className={styles.grid}>
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              className={getButtonClass(btn.type)}
              onClick={btn.action}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <>
          <div className={styles.historyTitle}>History</div>
          <div className={styles.history}>
            {history.map((h, i) => (
              <div key={i} className={styles.historyItem}>
                <span className={styles.historyExpr}>{h.expression}</span>
                <span className={styles.historyResult}>{h.result}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
