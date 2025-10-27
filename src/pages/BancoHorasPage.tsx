import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  RefreshCcw,
  Timer,
  TrendingUp,
  ClipboardList,
  History,
} from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';

type CalendarStatus = 'working' | 'overtime' | 'absence';

type TimeBankPageContent = {
  header: {
    title: string;
    subtitle: string;
    rating: string;
    runningBadge: string;
    balanceLabel: string;
    balanceValue: string;
  };
  about: {
    title: string;
    description: string;
    details: Array<{ label: string; value: string }>;
  };
  liveTracker: {
    title: string;
    currentTaskLabel: string;
    currentTaskPlaceholder: string;
    elapsedLabel: string;
    startLabel: string;
    pauseLabel: string;
    resumeLabel: string;
    resetLabel: string;
    note: string;
    runningSinceLabel: string;
    manualEntry: {
      title: string;
      description: string;
      action: string;
    };
  };
  calendar: {
    title: string;
    monthLabel: string;
    legend: {
      working: string;
      overtime: string;
      absence: string;
    };
    summary: {
      totalTracked: string;
      overtime: string;
      daysWorked: string;
    };
    weekDays: string[];
    days: Array<{ date: string; hours: string; status: CalendarStatus }>;
  };
  history: {
    title: string;
    filterLabel: string;
    exportLabel: string;
    entries: Array<{
      date: string;
      weekDay: string;
      duration: string;
      activity: string;
      project: string;
      notes: string;
    }>;
  };
  stats: {
    title: string;
    items: Array<{ label: string; value: string; helper: string }>;
  };
  insights: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  quickActions: {
    title: string;
    actions: Array<{ label: string; description: string }>;
  };
};

const CALENDAR_STYLE_MAP: Record<CalendarStatus, string> = {
  working: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  overtime: 'bg-amber-50 border-amber-200 text-amber-700',
  absence: 'bg-slate-100 border-slate-200 text-slate-500',
};

const BancoHorasPage = () => {
  const { t } = useI18n();
  const content = t('timeBankPage', { returnObjects: true }) as TimeBankPageContent;

  const [isTracking, setIsTracking] = useState(false);
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const [accumulatedSeconds, setAccumulatedSeconds] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentTask, setCurrentTask] = useState('');

  // Atualiza o contador a cada segundo enquanto estiver rodando
  useEffect(() => {
    let interval: number | undefined;

    if (isTracking && sessionStart) {
      interval = window.setInterval(() => {
        const diff = Math.floor((Date.now() - sessionStart) / 1000);
        setElapsedSeconds(accumulatedSeconds + diff);
      }, 1000);
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isTracking, sessionStart, accumulatedSeconds]);

  useEffect(() => {
    if (!isTracking) {
      setElapsedSeconds(accumulatedSeconds);
    }
  }, [isTracking, accumulatedSeconds]);

  const formattedElapsed = useMemo(() => {
    const hours = Math.floor(elapsedSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((elapsedSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }, [elapsedSeconds]);

  const handleStart = () => {
    if (isTracking) {
      return;
    }
    setSessionStart(Date.now());
    setIsTracking(true);
  };

  const handlePause = () => {
    if (!sessionStart) {
      setIsTracking(false);
      return;
    }
    const diff = Math.floor((Date.now() - sessionStart) / 1000);
    const updated = accumulatedSeconds + diff;
    setAccumulatedSeconds(updated);
    setElapsedSeconds(updated);
    setSessionStart(null);
    setIsTracking(false);
  };

  const handleReset = () => {
    setIsTracking(false);
    setElapsedSeconds(0);
    setSessionStart(null);
    setAccumulatedSeconds(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <SEO
        title={DEMO_PAGES_CONFIG.timeBank.title}
        description={DEMO_PAGES_CONFIG.timeBank.description}
        keywords={DEMO_PAGES_CONFIG.timeBank.keywords}
        ogImage={DEMO_PAGES_CONFIG.timeBank.ogImage}
        url={DEMO_PAGES_CONFIG.timeBank.url}
      />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{content.header.title}</h1>
                <p className="text-gray-600">{content.header.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 text-emerald-500 mr-1" />
                <span>{content.header.runningBadge}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{content.header.rating}</span>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1 text-sm font-medium text-emerald-700">
                <span className="block text-xs uppercase tracking-wider">{content.header.balanceLabel}</span>
                <span>{content.header.balanceValue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="xl:col-span-2 space-y-6">
            {/* Sobre */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="lg:w-2/3">
                  <h2 className="text-xl font-semibold text-slate-900 mb-3">{content.about.title}</h2>
                  <p className="text-slate-600 leading-relaxed">{content.about.description}</p>
                </div>
                <div className="flex-1 grid sm:grid-cols-2 gap-4">
                  {content.about.details.map((detail) => (
                    <div key={detail.label} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-slate-500">{detail.label}</p>
                      <p className="text-sm font-semibold text-slate-900">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Tracker */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{content.liveTracker.title}</h2>
                  <p className="text-sm text-slate-500">{content.liveTracker.note}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2 text-emerald-700 font-semibold text-lg">
                    {formattedElapsed}
                  </div>
                  <span className="text-xs text-slate-500 uppercase tracking-wide">
                    {content.liveTracker.elapsedLabel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {content.liveTracker.currentTaskLabel}
                  </label>
                  <input
                    type="text"
                    value={currentTask}
                    onChange={(event) => setCurrentTask(event.target.value)}
                    placeholder={content.liveTracker.currentTaskPlaceholder}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={isTracking ? handlePause : handleStart}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                      isTracking
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {isTracking ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isTracking
                      ? content.liveTracker.pauseLabel
                      : accumulatedSeconds > 0
                        ? content.liveTracker.resumeLabel
                        : content.liveTracker.startLabel}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    {content.liveTracker.resetLabel}
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {content.liveTracker.runningSinceLabel}
                  </p>
                  <p className="font-semibold text-slate-900">
                    {sessionStart ? new Date(sessionStart).toLocaleTimeString() : '--:--'}
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {content.liveTracker.manualEntry.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      {content.liveTracker.manualEntry.description}
                    </span>
                    <button
                      type="button"
                      className="text-emerald-600 font-semibold hover:text-emerald-700"
                    >
                      {content.liveTracker.manualEntry.action}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Histórico */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{content.history.title}</h2>
                  <p className="text-sm text-slate-500">{content.history.filterLabel}</p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <History className="w-4 h-4" />
                  {content.history.exportLabel}
                </button>
              </div>

              <div className="space-y-4">
                {content.history.entries.map((entry) => (
                  <div
                    key={`${entry.date}-${entry.activity}`}
                    className="border border-slate-200 rounded-lg p-4 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {entry.date} • {entry.weekDay}
                        </p>
                        <p className="text-xs uppercase tracking-wide text-slate-500">{entry.project}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-lg">
                          {entry.duration}
                        </div>
                        <span className="text-sm text-slate-600">{entry.activity}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{entry.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna lateral */}
          <div className="space-y-6">
            {/* Calendário */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{content.calendar.title}</h2>
                  <p className="text-sm text-slate-500">{content.calendar.monthLabel}</p>
                </div>
                <CalendarDays className="w-5 h-5 text-emerald-500" />
              </div>

              <div className="grid grid-cols-7 gap-2 text-center mb-3">
                {content.calendar.weekDays.map((weekday) => (
                  <span key={weekday} className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    {weekday}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {content.calendar.days.map((day) => (
                  <div
                    key={day.date}
                    className={`rounded-lg border px-2 py-3 text-center transition-colors ${CALENDAR_STYLE_MAP[day.status]}`}
                  >
                    <p className="text-xs font-semibold">{day.date}</p>
                    <p className="text-[0.65rem]">{day.hours}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{content.calendar.summary.totalTracked}</span>
                  <span>{content.calendar.summary.daysWorked}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{content.calendar.summary.overtime}</span>
                  <span className="text-emerald-600 font-semibold">
                    {content.header.balanceValue}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-slate-500 pt-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    {content.calendar.legend.working}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-amber-400 rounded-full" />
                    {content.calendar.legend.overtime}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-slate-300 rounded-full" />
                    {content.calendar.legend.absence}
                  </span>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">{content.stats.title}</h2>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="space-y-3">
                {content.stats.items.map((item) => (
                  <div key={item.label} className="border border-slate-100 rounded-lg px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                    <p className="text-lg font-semibold text-slate-900">{item.value}</p>
                    <p className="text-xs text-slate-500">{item.helper}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">{content.insights.title}</h2>
                <ClipboardList className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="space-y-3">
                {content.insights.items.map((item) => (
                  <div key={item.title} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações rápidas */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                {content.quickActions.title}
              </h2>
              <div className="space-y-3">
                {content.quickActions.actions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    className="w-full text-left border border-slate-200 rounded-lg px-4 py-3 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
                  >
                    <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                    <p className="text-xs text-slate-500">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BancoHorasPage;
