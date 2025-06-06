import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from '@/components/ui/table';
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from 'date-fns';
import { cn } from "@/lib/utils"
import { CalendarIcon, PlusCircle, Search, BarChart, Settings, ListChecks, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock API functions (replace with actual API calls)
const mockAPI = {
logDose: async (dose: DoseLogEntry): Promise<DoseLogEntry> => {
await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
return { ...dose, id: crypto.randomUUID() }; // Mock ID generation
},
getAverageCharge: async (): Promise<number> => {
await new Promise((resolve) => setTimeout(resolve, 500));
return 150.50; // Mock average charge
},
searchFoods: async (query: string): Promise<FoodItem[]> => {
await new Promise((resolve) => setTimeout(resolve, 500));
// Mock food data
const mockFoodData: FoodItem[] = [
{ id: '1', name: 'Apple', carbs: 15 },
{ id: '2', name: 'Banana', carbs: 27 },
{ id: '3', name: 'Chicken Breast (100g)', carbs: 0 },
{ id: '4', name: 'Brown Rice (1 cup)', carbs: 45 },
{ id: '5', name: 'Pasta (1 cup)', carbs: 40 },
{ id: '6', name: 'Pizza (1 slice)', carbs: 30 },
{ id: '7', name: 'Salad (large)', carbs: 10 },
{ id: '8', name: 'Orange Juice (1 cup)', carbs: 25 },
{ id: '9', name: 'Milk (1 cup)', carbs: 12 },
{ id: '10', name: 'Yogurt (1 cup)', carbs: 17 },
];
return mockFoodData.filter((food) => food.name.toLowerCase().includes(query.toLowerCase()));
},
calculateInsulinDose: async (carbs: number, bloodSugar: number, sensitivityFactor: number, targetBloodSugar: number): Promise<number> => {
await new Promise((resolve) => setTimeout(resolve, 500));
// Mock insulin calculation
const correctionDose = (bloodSugar - targetBloodSugar) / sensitivityFactor;
const carbDose = carbs / 15; // Assume 1 unit of insulin for every 15g of carbs
return Math.max(0, Math.round((carbDose + correctionDose) \* 10) / 10); // Round to 1 decimal place
},
getDoseHistory: async (): Promise<DoseLogEntry[]> => {
await new Promise((resolve) => setTimeout(resolve, 500));
return mockDoseHistory;
},
updateSettings: async (settings: UserSettings): Promise<UserSettings> => {
await new Promise((resolve) => setTimeout(resolve, 500));
return settings;
},
getSettings: async (): Promise<UserSettings> => {
await new Promise((resolve) => setTimeout(resolve, 500));
return mockUserSettings;
},
};

// Types
interface DoseLogEntry {
id: string;
date: Date;
dose: number;
food?: string; // Optional food association
bloodSugar?: number; // Optional blood sugar reading
notes?: string;
}

interface FoodItem {
id: string;
name: string;
carbs: number;
}

interface UserSettings {
sensitivityFactor: number; // How much 1 unit of insulin lowers blood sugar (e.g., 50 mg/dL)
targetBloodSugar: number;
}

// Mock Data
const mockDoseHistory: DoseLogEntry[] = [
{ id: '1', date: new Date(), dose: 5, food: 'Pasta', bloodSugar: 200, notes: 'Before dinner' },
{ id: '2', date: new Date(Date.now() - 86400000), dose: 3, food: 'Apple', bloodSugar: 120, notes: 'Before snack' },
{ id: '3', date: new Date(Date.now() - 172800000), dose: 8, food: 'Pizza', bloodSugar: 250, notes: 'Before lunch' },
];

const mockUserSettings: UserSettings = {
sensitivityFactor: 50,
targetBloodSugar: 100,
};

// Helper Functions
const formatDate = (date: Date) => {
return format(date, 'yyyy-MM-dd HH:mm');
};

const App: React.FC = () => {
// State
const [dose, setDose] = useState<number | string>('');
const [foodQuery, setFoodQuery] = useState('');
const [foodResults, setFoodResults] = useState<FoodItem[]>([]);
const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
const [bloodSugar, setBloodSugar] = useState<number | string>('');
const [doseHistory, setDoseHistory] = useState<DoseLogEntry[]>([]);
const [averageCharge, setAverageCharge] = useState<number | null>(null);
const [date, setDate] = useState<Date>(new Date());
const [notes, setNotes] = useState('');
const [settings, setSettings] = useState<UserSettings>(mockUserSettings);
const [activeSection, setActiveSection] = useState<'home' | 'logDose' | 'history' | 'foodSearch' | 'insulinCalc' | 'reports' | 'settings'>('home');

    // Effects
    useEffect(() => {
        const loadInitialData = async () => {
            const history = await mockAPI.getDoseHistory();
            const charge = await mockAPI.getAverageCharge();
            const userSettings = await mockAPI.getSettings();
            setDoseHistory(history);
            setAverageCharge(charge);
            setSettings(userSettings);
        };
        loadInitialData();
    }, []);

    // Handlers
    const handleLogDose = useCallback(async () => {
        if (typeof dose === 'string' || isNaN(Number(dose))) {
            alert('Please enter a valid dose.');
            return;
        }

        const doseData: DoseLogEntry = {
            date,
            dose: Number(dose),
            food: selectedFood?.name,
            bloodSugar: Number(bloodSugar) || undefined,
            notes,
        };

        const newDose = await mockAPI.logDose(doseData);
        setDoseHistory((prev) => [newDose, ...prev]);
        setDose('');
        setFoodQuery('');
        setFoodResults([]);
        setSelectedFood(null);
        setBloodSugar('');
        setNotes('');
        setDate(new Date());
        setActiveSection('history'); // Go to history after logging
    }, [dose, date, selectedFood, bloodSugar, notes]);

    const handleFoodSearch = async () => {
        if (!foodQuery.trim()) return;
        const results = await mockAPI.searchFoods(foodQuery);
        setFoodResults(results);
    };

    const handleCalculateInsulin = async () => {
      if (!selectedFood) {
          alert('Please select a food item.');
          return;
      }
      if (typeof bloodSugar === 'string' || isNaN(Number(bloodSugar))) {
          alert('Please enter your blood sugar level.');
          return;
      }

      const calculatedDose = await mockAPI.calculateInsulinDose(
          selectedFood.carbs,
          Number(bloodSugar),
          settings.sensitivityFactor,
          settings.targetBloodSugar
      );
      setDose(calculatedDose);
    };

    const handleSettingsSave = async () => {
      const updatedSettings = await mockAPI.updateSettings(settings);
      setSettings(updatedSettings);
      alert('Settings saved successfully!');
      setActiveSection('home');
    };

    // UI Components
    const DoseLogForm = () => (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Log Dose</CardTitle>
                <CardDescription>Record your insulin dose</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium block">Date & Time</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                {date ? formatDate(date) : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-2">
                    <label htmlFor="dose" className="text-sm font-medium block">Dose (units)</label>
                    <Input
                        id="dose"
                        type="number"
                        value={dose}
                        onChange={(e) => setDose(e.target.value)}
                        placeholder="Enter dose"
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                  <label htmlFor="food" className="text-sm font-medium block">Food (Optional)</label>
                    <div className="flex gap-2">
                        <Input
                            id="food"
                            type="text"
                            value={foodQuery}
                            onChange={(e) => setFoodQuery(e.target.value)}
                            placeholder="Search for food"
                            className="flex-1"
                        />
                        <Button onClick={handleFoodSearch} variant="outline" size="sm">
                            <Search className="mr-2 h-4 w-4" /> Search
                        </Button>
                    </div>
                    {foodResults.length > 0 && (
                        <Select onValueChange={(value) => {
                            const selected = foodResults.find(f => f.id === value);
                            setSelectedFood(selected || null);
                        }} value={selectedFood?.id}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a food" />
                            </SelectTrigger>
                            <SelectContent>
                                {foodResults.map((food) => (
                                    <SelectItem key={food.id} value={food.id}>
                                        {food.name} ({food.carbs}g carbs)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    {selectedFood && (
                        <div className="mt-2 text-sm text-gray-500">
                            Selected Food: {selectedFood.name} ({selectedFood.carbs}g carbs)
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="bloodSugar" className="text-sm font-medium block">Blood Sugar (mg/dL) (Optional)</label>
                    <Input
                        id="bloodSugar"
                        type="number"
                        value={bloodSugar}
                        onChange={(e) => setBloodSugar(e.target.value)}
                        placeholder="Enter blood sugar"
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium block">Notes (Optional)</label>
                    <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add notes (e.g., reason for dose)"
                        className="w-full"
                        rows={3}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogDose} className="w-full">Log Dose</Button>
            </CardFooter>
        </Card>
    );

    const DoseHistoryTable = () => (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Dose History</CardTitle>
          <CardDescription>View your past insulin doses</CardDescription>
        </CardHeader>
        <CardContent>
          {doseHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Dose (units)</TableHead>
                  <TableHead>Food</TableHead>
                  <TableHead>Blood Sugar (mg/dL)</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doseHistory.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{formatDate(entry.date)}</TableCell>
                    <TableCell>{entry.dose}</TableCell>
                    <TableCell>{entry.food || '-'}</TableCell>
                    <TableCell>{entry.bloodSugar || '-'}</TableCell>
                    <TableCell>{entry.notes || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No dose history available.</p>
          )}
        </CardContent>
      </Card>
    );

    const FoodSearchComponent = () => (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Food Search</CardTitle>
          <CardDescription>Search for carbohydrate information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              value={foodQuery}
              onChange={(e) => setFoodQuery(e.target.value)}
              placeholder="Search for food"
              className="flex-1"
            />
            <Button onClick={handleFoodSearch} variant="outline">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          {foodResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Results:</h3>
              <ul className="list-disc list-inside">
                {foodResults.map((food) => (
                  <li
                    key={food.id}
                    className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                    onClick={() => {
                        setSelectedFood(food);
                        setFoodQuery('');
                        setFoodResults([]);
                    }}
                  >
                    {food.name} ({food.carbs}g carbs)
                  </li>
                ))}
              </ul>
            </div>
          )}
            {selectedFood && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h4 className="text-md font-semibold">Selected Food:</h4>
                <p>Name: {selectedFood.name}</p>
                <p>Carbs: {selectedFood.carbs} g</p>
                </div>
            )}
        </CardContent>
      </Card>
    );

    const InsulinCalculator = () => (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Insulin Calculator</CardTitle>
                <CardDescription>Calculate your insulin dose</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium block">Select Food</label>
                    <div className="flex gap-2">
                        <Input
                        type="text"
                        value={foodQuery}
                        onChange={(e) => setFoodQuery(e.target.value)}
                        placeholder="Search for food"
                        className="flex-1"
                        />
                        <Button onClick={handleFoodSearch} variant="outline" size="sm">
                        <Search className="mr-2 h-4 w-4" /> Search
                        </Button>
                    </div>
                    {foodResults.length > 0 && (
                        <Select onValueChange={(value) => {
                        const selected = foodResults.find(f => f.id === value);
                        setSelectedFood(selected || null);
                        }} value={selectedFood?.id}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a food" />
                        </SelectTrigger>
                        <SelectContent>
                            {foodResults.map((food) => (
                            <SelectItem key={food.id} value={food.id}>
                                {food.name} ({food.carbs}g carbs)
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                    {selectedFood && (
                        <div className="mt-2 text-sm text-gray-500">
                        Selected Food: {selectedFood.name} ({selectedFood.carbs}g carbs)
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                <label htmlFor="bloodSugarCalc" className="text-sm font-medium block">Blood Sugar (mg/dL)</label>
                <Input
                    id="bloodSugarCalc"
                    type="number"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(e.target.value)}
                    placeholder="Enter blood sugar"
                    className="w-full"
                />
                </div>

                <div className="space-y-2">
                <label className="text-sm font-medium block">Sensitivity Factor (mg/dL per unit of insulin)</label>
                <Input
                    type="number"
                    value={settings.sensitivityFactor}
                    onChange={(e) => setSettings({ ...settings, sensitivityFactor: Number(e.target.value) })}
                    placeholder="Enter sensitivity factor"
                    className="w-full"
                />
                </div>

                <div className="space-y-2">
                <label className="text-sm font-medium block">Target Blood Sugar (mg/dL)</label>
                <Input
                    type="number"
                    value={settings.targetBloodSugar}
                    onChange={(e) => setSettings({ ...settings, targetBloodSugar: Number(e.target.value) })}
                    placeholder="Enter target blood sugar"
                    className="w-full"
                />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleCalculateInsulin} className="w-full">Calculate Dose</Button>
            </CardFooter>
            {typeof dose === 'number' && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
                <h3 className="text-lg font-semibold">Recommended Dose:</h3>
                <p>{dose} units</p>
                </div>
            )}
        </Card>
    );

    const ReportsSection = () => (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>View reports and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            {averageCharge !== null ? (
              <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded-md">
                <h3 className="text-lg font-semibold">Average Charge:</h3>
                <p>${averageCharge.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-gray-500 mb-4">Loading average charge...</p>
            )}
            {/* Add more report components here (e.g., charts, graphs) */}
             <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-md">
                <h3 className="text-lg font-semibold">Coming Soon:</h3>
                <p>More detailed reports and charts will be available in future updates.</p>
            </div>
          </CardContent>
        </Card>
    );

    const SettingsSection = () => (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Customize your preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium block">Sensitivity Factor (mg/dL per unit of insulin)</label>
            <Input
              type="number"
              value={settings.sensitivityFactor}
              onChange={(e) => setSettings({ ...settings, sensitivityFactor: Number(e.target.value) })}
              placeholder="Enter sensitivity factor"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium block">Target Blood Sugar (mg/dL)</label>
            <Input
              type="number"
              value={settings.targetBloodSugar}
              onChange={(e) => setSettings({ ...settings, targetBloodSugar: Number(e.target.value) })}
              placeholder="Enter target blood sugar"
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSettingsSave} className="w-full">Save Settings</Button>
        </CardFooter>
      </Card>
    );

    // Main App Structure
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md py-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Diabetes Management App</h1>
            <nav>
              <ul className="flex gap-6">
                <li
                  className={cn(
                    "cursor-pointer hover:text-blue-600 transition-colors",
                    activeSection === 'home' && 'text-blue-600'
                  )}
                  onClick={() => setActiveSection('home')}
                >
                  Home
                </li>
                <li
                  className={cn(
                    "cursor-pointer hover:text-blue-600 transition-colors",
                    activeSection === 'logDose' && 'text-blue-600'
                  )}
                  onClick={() => setActiveSection('logDose')}
                >
                  <ListChecks className="mr-1 inline-block h-4 w-4" /> Log Dose
                </li>
                <li
                  className={cn(
                    "cursor-pointer hover:text-blue-600 transition-colors",
                    activeSection === 'history' && 'text-blue-600'
                  )}
                  onClick={() => setActiveSection('history')}
                >
                   <ListChecks className="mr-1 inline-block h-4 w-4" /> Dose History
                </li>
                 <li
                  className={cn(
                    "cursor-pointer hover:text-blue-600 transition-colors",
                    activeSection === 'foodSearch' && 'text-blue-600'
                  )}
                  onClick={() => setActiveSection('foodSearch')}
                >
                  <Search className="mr-1 inline-block h-4 w-4" /> Food Search
                </li>
                <li
                  className={cn(
                    "cursor-pointer hover:text-blue-600 transition-colors",
                    activeSection === 'insulinCalc' && 'text-blue-600'
                  )}
                  onClick={() => setActiveSection('insulinCalc')}
                >
                  <PlusCircle className="mr-1 inline-block h-4 w-4" /> Insulin Calc
                </li>
                <li
                  className={cn(
                    "cursor-pointer hover:text-blue-600 transition-colors",
                    activeSection === 'reports' && 'text-blue-600'
                  )}
                  onClick={() => setActiveSection('reports')}
                >
                  <BarChart className="mr-1 inline-block h-4 w-4" /> Reports
                </li>
                <li
                  className={cn(
                    "cursor-pointer hover:text-blue-600 transition-colors",
                    activeSection ==='settings' && 'text-blue-600'
                  )}
                  onClick={() => setActiveSection('settings')}
                >
                  <Settings className="mr-1 inline-block h-4 w-4" /> Settings
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="container mx-auto py-8">
          <AnimatePresence mode="wait">
            {activeSection === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Welcome to Your Diabetes Management App</CardTitle>
                        <CardDescription>
                        This app helps you track your insulin doses, manage your diet, and calculate your insulin needs.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Log Dose</CardTitle>
                                    <CardDescription>Record your insulin doses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-500">Quickly log your insulin doses with date, time, and optional food and blood sugar information.</p>
                                    <Button className="mt-4" onClick={() => setActiveSection('logDose')}>
                                        <PlusCircle className="mr-2 h-4 w-4" /> Log a Dose
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>View History</CardTitle>
                                    <CardDescription>See your past doses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-500">Access a detailed history of your insulin doses, including dates, times, and related information.</p>
                                    <Button className="mt-4" onClick={() => setActiveSection('history')}>
                                      <ListChecks className="mr-2 h-4 w-4" />  View History
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Food Search</CardTitle>
                                    <CardDescription>Find carb information</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-500">Search for foods and get their carbohydrate counts to help you plan your meals and doses.</p>
                                    <Button className="mt-4" onClick={() => setActiveSection('foodSearch')}>
                                      <Search className="mr-2 h-4 w-4" />  Search Foods
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Insulin Calculator</CardTitle>
                                    <CardDescription>Calculate your dose</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-500">Calculate your insulin dose based on food intake and blood sugar levels.</p>
                                    <Button className="mt-4" onClick={() => setActiveSection('insulinCalc')}>
                                      <PlusCircle className="mr-2 h-4 w-4" />  Calculate Dose
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
              </motion.div>
            )}
            {activeSection === 'logDose' && (
              <motion.div
                key="logDose"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DoseLogForm />
              </motion.div>
            )}
            {activeSection === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DoseHistoryTable />
              </motion.div>
            )}
            {activeSection === 'foodSearch' && (
              <motion.div
                key="foodSearch"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FoodSearchComponent/>
              </motion.div>
            )}
            {activeSection === 'insulinCalc' && (
                <motion.div
                key="insulinCalc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                >
                <InsulinCalculator />
                </motion.div>
            )}
            {activeSection === 'reports' && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ReportsSection />
              </motion.div>
            )}
             {activeSection === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SettingsSection />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="bg-gray-200 py-4 mt-8">
          <div className="container mx-auto text-center text-gray-600">
            &copy; {new Date().getFullYear()} Diabetes Management App. All rights reserved.
          </div>
        </footer>
      </div>
    );

};

export default App;



