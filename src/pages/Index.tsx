import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [is3DTourOpen, setIs3DTourOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: 'Здравствуйте! Я помощник Исторического музея Оренбурга. Чем могу помочь?', isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    tourType: '',
    visitors: 1
  });

  const botResponses: Record<string, string> = {
    'время работы': 'Музей работает с 10:00 до 18:00 со вторника по воскресенье. Понедельник — выходной.',
    'стоимость': 'Взрослый билет — 300₽, студенческий — 150₽, школьники — 100₽, дети до 7 лет — бесплатно.',
    'экскурсии': 'Экскурсии проводятся каждые 2 часа: 11:00, 13:00, 15:00, 17:00. Запись по телефону или на сайте.',
    'адрес': 'Мы находимся по адресу: г. Оренбург, ул. Советская, 28. Ближайшая остановка "Площадь Ленина".',
    'выставки': 'Сейчас работают постоянные экспозиции "История края" и "Великая война", а также временная выставка "Традиции кочевников".',
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { text: inputMessage, isUser: true }]);

    const lowercaseInput = inputMessage.toLowerCase();
    let response = 'Спасибо за вопрос! Я могу рассказать о времени работы, стоимости билетов, экскурсиях, адресе и текущих выставках. Что вас интересует?';

    for (const [key, value] of Object.entries(botResponses)) {
      if (lowercaseInput.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 500);

    setInputMessage('');
  };

  const exhibitions = [
    {
      title: 'История Оренбургского края',
      description: 'От древних поселений до современности',
      period: 'Постоянная экспозиция',
      icon: 'Landmark'
    },
    {
      title: 'Великая Отечественная война',
      description: 'Подвиг оренбуржцев в годы войны',
      period: 'Постоянная экспозиция',
      icon: 'Medal'
    },
    {
      title: 'Традиции кочевников',
      description: 'Культура степных народов',
      period: 'До 15 марта 2025',
      icon: 'Crown'
    },
    {
      title: 'Археологические находки',
      description: 'Древние артефакты региона',
      period: 'Постоянная экспозиция',
      icon: 'Sparkles'
    }
  ];

  const schedule = [
    { day: 'Понедельник', time: 'Выходной', status: 'closed' },
    { day: 'Вторник - Пятница', time: '10:00 - 18:00', status: 'open' },
    { day: 'Суббота - Воскресенье', time: '11:00 - 19:00', status: 'open' },
  ];

  const tours = [
    { time: '11:00', type: 'Обзорная экскурсия', duration: '1.5 часа' },
    { time: '13:00', type: 'История края', duration: '2 часа' },
    { time: '15:00', type: 'Военная слава', duration: '1 час' },
    { time: '17:00', type: 'Детская экскурсия', duration: '1 час' },
  ];

  const events = [
    {
      date: '15 декабря',
      title: 'Лекция "Оренбург в XIX веке"',
      time: '14:00'
    },
    {
      date: '22 декабря',
      title: 'Мастер-класс по археологии',
      time: '12:00'
    },
    {
      date: '29 декабря',
      title: 'Новогодняя программа для детей',
      time: '15:00'
    }
  ];

  const galleryItems = [
    { emoji: '🏺', title: 'Древняя керамика', category: 'Археология', era: 'III век до н.э.', description: 'Уникальная керамическая посуда сарматов, найденная при раскопках курганов. Сохранились орнаменты и следы красителей.' },
    { emoji: '⚔️', title: 'Сарматский меч', category: 'Оружие', era: 'I-II век н.э.', description: 'Железный меч с бронзовой рукоятью. Принадлежал знатному воину-сармату. Длина 90 см, отличная сохранность.' },
    { emoji: '👑', title: 'Золотая диадема', category: 'Украшения', era: 'IV век до н.э.', description: 'Церемониальное украшение из золота с инкрустацией драгоценными камнями. Вес 320 грамм.' },
    { emoji: '📜', title: 'Древняя рукопись', category: 'Документы', era: 'XV век', description: 'Рукописная книга на старославянском языке. Пергамент, чернила. Содержит исторические хроники.' },
    { emoji: '🎭', title: 'Народная маска', category: 'Этнография', era: 'XIX век', description: 'Ритуальная маска башкир, использовалась в обрядовых танцах. Дерево, кожа, натуральные красители.' },
    { emoji: '🗡️', title: 'Кинжал казака', category: 'Оружие', era: 'XVIII век', description: 'Боевой кинжал оренбургского казака с гравировкой. Сталь, серебро, кожаные ножны.' },
    { emoji: '💍', title: 'Кольцо княгини', category: 'Украшения', era: 'XVI век', description: 'Золотое кольцо с печатью княжеского рода. Найдено при археологических работах в 1965 году.' },
    { emoji: '🏛️', title: 'Макет крепости', category: 'Архитектура', era: '1743 год', description: 'Детальный макет Оренбургской крепости по чертежам И. Неплюева. Масштаб 1:500.' },
    { emoji: '🎨', title: 'Портрет основателя', category: 'Живопись', era: '1831 год', description: 'Портрет основателя музея П.П. Сухтелена. Масло, холст. Работа неизвестного художника.' },
    { emoji: '🪙', title: 'Монеты Империи', category: 'Нумизматика', era: 'XVIII-XIX век', description: 'Коллекция из 47 серебряных и золотых монет Российской Империи в отличном состоянии.' },
    { emoji: '📖', title: 'Первая печатная книга', category: 'Библиотека', era: '1850 год', description: 'Первая книга, напечатанная в Оренбургской типографии. "История Оренбургского края".' },
    { emoji: '🎖️', title: 'Орден Славы', category: 'Награды', era: '1945 год', description: 'Орден Славы III степени оренбуржца-героя Великой Отечественной войны.' }
  ];

  const museumRooms = [
    {
      name: 'Главный зал',
      description: 'История основания Оренбурга и развития города',
      icon: '🏛️',
      artifacts: 'Документы, карты, портреты основателей'
    },
    {
      name: 'Зал археологии',
      description: 'Древние поселения и находки эпохи бронзы',
      icon: '🏺',
      artifacts: 'Керамика, орудия труда, украшения'
    },
    {
      name: 'Военный зал',
      description: 'Оренбуржцы в Великой Отечественной войне',
      icon: '🎖️',
      artifacts: 'Награды, письма, военная форма'
    },
    {
      name: 'Этнографический зал',
      description: 'Культура и быт народов Южного Урала',
      icon: '🎭',
      artifacts: 'Национальные костюмы, предметы быта'
    }
  ];

  const handleBookingSubmit = () => {
    if (!bookingData.name || !bookingData.email || !bookingData.date || !bookingData.time || !bookingData.tourType) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    alert(`Спасибо, ${bookingData.name}! Ваша заявка на экскурсию принята. Мы свяжемся с вами по email: ${bookingData.email}`);
    setIsBookingOpen(false);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      tourType: '',
      visitors: 1
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm sticky top-0 z-40 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Building2" className="text-primary" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-primary">Исторический музей</h1>
                <p className="text-sm text-muted-foreground">Оренбург</p>
              </div>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#exhibitions" className="text-foreground hover:text-primary transition-colors">Экспозиции</a>
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors">Галерея</a>
              <a href="#history" className="text-foreground hover:text-primary transition-colors">История</a>
              <a href="#visit" className="text-foreground hover:text-primary transition-colors">Посещение</a>
              <a href="#events" className="text-foreground hover:text-primary transition-colors">События</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 text-base px-4 py-2">С 1831 года</Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-primary leading-tight">
              Путешествие сквозь века
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Откройте для себя богатую историю Оренбургского края в старейшем музее региона
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => setIs3DTourOpen(true)}>
                <Icon name="Maximize2" className="mr-2" size={20} />
                Виртуальный тур
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => setIsBotOpen(true)}>
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Задать вопрос боту
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-10 left-10 text-8xl opacity-5">🏛️</div>
        <div className="absolute bottom-10 right-10 text-8xl opacity-5">📜</div>
      </section>

      <section id="exhibitions" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Экспозиции музея</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Уникальные коллекции и выставки, рассказывающие историю края
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exhibitions.map((exhibition, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1 border-2">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={exhibition.icon as any} className="text-primary" size={32} />
                  </div>
                  <CardTitle className="text-xl">{exhibition.title}</CardTitle>
                  <CardDescription>{exhibition.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{exhibition.period}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" onClick={() => setIs3DTourOpen(true)} className="px-8 py-6">
              <Icon name="Maximize2" className="mr-2" size={20} />
              Начать виртуальный тур по залам
            </Button>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Галерея экспонатов</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Откройте для себя уникальные артефакты из нашей коллекции
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-2 group overflow-hidden"
                onClick={() => {
                  setCurrentImage(index);
                  setIsGalleryOpen(true);
                }}
              >
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <CardHeader className="p-3">
                  <CardTitle className="text-sm leading-tight">{item.title}</CardTitle>
                  <CardDescription className="text-xs">
                    <Badge variant="secondary" className="text-xs mt-1">{item.category}</Badge>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Нажмите на экспонат для полноэкранного просмотра</p>
            <Button size="lg" variant="outline">
              <Icon name="Image" className="mr-2" size={20} />
              Посмотреть всю коллекцию (250К+ экспонатов)
            </Button>
          </div>
        </div>
      </section>

      <section id="history" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">История музея</h2>
              <div className="space-y-4 text-lg text-foreground/80">
                <p>
                  Оренбургский исторический музей был основан в 1831 году и является одним из старейших музеев России. За почти два века своего существования музей собрал уникальную коллекцию артефактов.
                </p>
                <p>
                  В фондах музея хранится более 250 000 экспонатов: археологические находки, документы, фотографии, предметы быта и искусства, рассказывающие о жизни народов Южного Урала.
                </p>
                <p>
                  Здание музея — памятник архитектуры XIX века, который сам по себе представляет историческую ценность.
                </p>
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary">194</div>
                  <div className="text-sm text-muted-foreground">года истории</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">250К</div>
                  <div className="text-sm text-muted-foreground">экспонатов</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">50К</div>
                  <div className="text-sm text-muted-foreground">посетителей в год</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl h-96 flex items-center justify-center text-9xl">
                🏛️
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="visit" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Посещение</h2>
            <p className="text-lg text-muted-foreground">Расписание работы и экскурсий</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" className="text-primary" size={24} />
                  Режим работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                      <span className="font-medium">{item.day}</span>
                      <span className={item.status === 'closed' ? 'text-destructive' : 'text-primary font-semibold'}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <Icon name="Info" className="inline mr-2" size={16} />
                    Касса закрывается за 30 минут до окончания работы
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" className="text-primary" size={24} />
                  Расписание экскурсий
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tours.map((tour, index) => (
                    <div key={index} className="flex justify-between items-start py-3 border-b last:border-b-0">
                      <div>
                        <div className="font-bold text-primary text-lg">{tour.time}</div>
                        <div className="text-sm text-muted-foreground">{tour.duration}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{tour.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6" variant="outline" onClick={() => setIsBookingOpen(true)}>
                  <Icon name="Calendar" className="mr-2" size={18} />
                  Записаться на экскурсию
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Ticket" className="text-primary" size={24} />
                  Стоимость билетов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { category: 'Взрослый', price: '300₽' },
                    { category: 'Студенческий', price: '150₽' },
                    { category: 'Школьники', price: '100₽' },
                    { category: 'Дети до 7 лет', price: 'Бесплатно' }
                  ].map((ticket, index) => (
                    <div key={index} className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">{ticket.category}</div>
                      <div className="text-2xl font-bold text-primary">{ticket.price}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="events" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Ближайшие события</h2>
            <p className="text-lg text-muted-foreground">Лекции, мастер-классы и специальные мероприятия</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {events.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge className="w-fit mb-2">{event.date}</Badge>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Clock" size={18} />
                    <span>{event.time}</span>
                  </div>
                  <Button className="w-full mt-4" variant="outline">Зарегистрироваться</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Контакты</h2>
              <p className="text-lg text-muted-foreground">Мы всегда рады вашему визиту</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Как нас найти</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium">Адрес</div>
                      <div className="text-muted-foreground">г. Оренбург, ул. Советская, 28</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium">Телефон</div>
                      <div className="text-muted-foreground">+7 (3532) 77-68-50</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">info@museum-orenburg.ru</div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" onClick={() => setIsMapOpen(true)}>
                    <Icon name="MapPin" className="mr-2" size={18} />
                    Открыть карту
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Социальные сети</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: 'Facebook', name: 'Facebook', link: '#' },
                    { icon: 'Instagram', name: 'Instagram', link: '#' },
                    { icon: 'Youtube', name: 'YouTube', link: '#' },
                    { icon: 'Send', name: 'Telegram', link: '#' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Icon name={social.icon as any} className="text-primary" size={20} />
                      <span className="font-medium">{social.name}</span>
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Icon name="Building2" size={28} />
              <div>
                <div className="font-bold text-lg">Исторический музей Оренбурга</div>
                <div className="text-sm opacity-80">С 1831 года</div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-sm opacity-80">© 2024 Исторический музей Оренбурга</div>
              <div className="text-sm opacity-80">Все права защищены</div>
            </div>
          </div>
        </div>
      </footer>

      <Button
        onClick={() => setIsBotOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-2xl hover:scale-110 transition-transform z-50"
        size="icon"
      >
        <Icon name="MessageCircle" size={28} />
      </Button>

      <Dialog open={isBotOpen} onOpenChange={setIsBotOpen}>
        <DialogContent className="max-w-md h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Bot" className="text-primary" size={24} />
              Помощник музея
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Задайте вопрос..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} size="icon">
              <Icon name="Send" size={20} />
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Попробуйте спросить: время работы, стоимость, экскурсии, адрес, выставки
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={is3DTourOpen} onOpenChange={setIs3DTourOpen}>
        <DialogContent className="max-w-4xl h-[700px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Maximize2" className="text-primary" size={24} />
              Виртуальный тур по музею
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 flex flex-col">
            <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-xl flex-1 flex items-center justify-center relative overflow-hidden">
              <div className="text-9xl mb-8">{museumRooms[currentRoom].icon}</div>
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center p-8">
                <h3 className="text-4xl font-bold text-white mb-4 text-center">{museumRooms[currentRoom].name}</h3>
                <p className="text-xl text-white/90 mb-4 text-center max-w-xl">{museumRooms[currentRoom].description}</p>
                <Badge className="text-base px-4 py-2 bg-white/20 backdrop-blur-md text-white border-white/30">
                  {museumRooms[currentRoom].artifacts}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6 gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentRoom((prev) => (prev - 1 + museumRooms.length) % museumRooms.length)}
              >
                <Icon name="ChevronLeft" className="mr-2" size={20} />
                Предыдущий зал
              </Button>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Зал {currentRoom + 1} из {museumRooms.length}</div>
                <div className="flex gap-2">
                  {museumRooms.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentRoom ? 'bg-primary' : 'bg-muted'}`}
                    />
                  ))}
                </div>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentRoom((prev) => (prev + 1) % museumRooms.length)}
              >
                Следующий зал
                <Icon name="ChevronRight" className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="MapPin" className="text-primary" size={24} />
              Как добраться до музея
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-center text-8xl mb-4">🗺️</div>
              <div className="text-center space-y-2">
                <h4 className="font-bold text-lg">Исторический музей Оренбурга</h4>
                <p className="text-muted-foreground">г. Оренбург, ул. Советская, 28</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon name="Bus" className="text-primary" size={20} />
                    Общественный транспорт
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p><strong>Автобусы:</strong> №12, №34, №56</p>
                  <p><strong>Троллейбусы:</strong> №4, №9</p>
                  <p><strong>Остановка:</strong> "Площадь Ленина"</p>
                  <p className="text-muted-foreground">5 минут пешком от остановки</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon name="Car" className="text-primary" size={20} />
                    На автомобиле
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p><strong>Парковка:</strong> Есть</p>
                  <p><strong>Мест:</strong> ~20 машин</p>
                  <p><strong>Стоимость:</strong> Бесплатно</p>
                  <p className="text-muted-foreground">Вход со двора здания</p>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Icon name="Navigation" className="text-primary" size={20} />
                  Координаты для навигатора
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm">51.7727° N, 55.0988° E</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    Открыть в Яндекс.Картах
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Открыть в 2ГИС
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Calendar" className="text-primary" size={24} />
              Записаться на экскурсию
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ваше имя *</label>
                <Input
                  placeholder="Иван Иванов"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  placeholder="ivan@example.com"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Телефон</label>
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Дата посещения *</label>
                <Input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Время *</label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                >
                  <option value="">Выберите время</option>
                  <option value="11:00">11:00 - Обзорная экскурсия</option>
                  <option value="13:00">13:00 - История края</option>
                  <option value="15:00">15:00 - Военная слава</option>
                  <option value="17:00">17:00 - Детская экскурсия</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Тип экскурсии *</label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={bookingData.tourType}
                onChange={(e) => setBookingData({ ...bookingData, tourType: e.target.value })}
              >
                <option value="">Выберите тип</option>
                <option value="standard">Стандартная (1.5 часа) - 300₽</option>
                <option value="extended">Расширенная (2.5 часа) - 500₽</option>
                <option value="thematic">Тематическая (2 часа) - 400₽</option>
                <option value="children">Детская (1 час) - 200₽</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Количество человек</label>
              <Input
                type="number"
                min="1"
                max="30"
                value={bookingData.visitors}
                onChange={(e) => setBookingData({ ...bookingData, visitors: parseInt(e.target.value) || 1 })}
              />
            </div>
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="flex items-start gap-2">
                  <Icon name="Info" className="text-primary mt-0.5" size={18} />
                  <p className="text-sm text-muted-foreground">
                    После отправки заявки мы свяжемся с вами для подтверждения записи. 
                    Оплата производится на месте в день посещения.
                  </p>
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleBookingSubmit} className="flex-1" size="lg">
                <Icon name="Check" className="mr-2" size={20} />
                Отправить заявку
              </Button>
              <Button onClick={() => setIsBookingOpen(false)} variant="outline" size="lg">
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
          <div className="relative flex-1 bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-9xl md:text-[200px] mb-8 animate-fade-in">
                  {galleryItems[currentImage].emoji}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              onClick={() => setIsGalleryOpen(false)}
            >
              <Icon name="X" size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-16 w-16"
              onClick={() => setCurrentImage((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
            >
              <Icon name="ChevronLeft" size={32} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-16 w-16"
              onClick={() => setCurrentImage((prev) => (prev + 1) % galleryItems.length)}
            >
              <Icon name="ChevronRight" size={32} />
            </Button>
          </div>
          <div className="bg-card p-6 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{galleryItems[currentImage].title}</h3>
                <div className="flex gap-2 mb-3">
                  <Badge>{galleryItems[currentImage].category}</Badge>
                  <Badge variant="outline">{galleryItems[currentImage].era}</Badge>
                </div>
                <p className="text-muted-foreground">{galleryItems[currentImage].description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="text-sm text-muted-foreground">
                Экспонат {currentImage + 1} из {galleryItems.length}
              </div>
              <div className="flex gap-1">
                {galleryItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImage ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentImage((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
                >
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentImage((prev) => (prev + 1) % galleryItems.length)}
                >
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;