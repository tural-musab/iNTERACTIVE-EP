# Content Data Structure - i-EP

## Lesson Structure

```json
{
  "id": "uuid",
  "title": "Kesirler - Giriş",
  "subject": "math",
  "grade": 5,
  "topic": "Kesirler",
  "content_type": "lesson",
  "content_data": {
    "description": "Kesirlerin temel tanımı ve gösterimi",
    "sections": [
      {
        "title": "Kesir Nedir?",
        "content": "Kesir, bir bütünün eşit parçalarından bir veya birkaçını gösterir.",
        "examples": [
          "1/2 = Bir bütünün yarısı",
          "3/4 = Dört eşit parçadan üçü"
        ]
      },
      {
        "title": "Kesir Çeşitleri",
        "content": "Basit kesir, bileşik kesir, tam sayılı kesir",
        "image": "optional-image-url"
      }
    ],
    "summary": "Bu derste kesirlerin ne olduğunu öğrendik."
  }
}
```

## Quiz Structure

```json
{
  "id": "uuid",
  "title": "Kesirler Quiz 1",
  "subject": "math",
  "grade": 5,
  "topic": "Kesirler",
  "content_type": "quiz",
  "content_data": {
    "instructions": "Her sorunun tek doğru cevabı vardır.",
    "time_limit": 15,
    "questions": [
      {
        "id": 1,
        "question": "1/2 + 1/2 = ?",
        "type": "multiple_choice",
        "options": ["1", "2", "1/4", "1/2"],
        "correct": 0,
        "points": 10
      },
      {
        "id": 2,
        "question": "3/4 hangi kesre eşittir?",
        "type": "multiple_choice",
        "options": ["6/8", "4/3", "1/4", "2/4"],
        "correct": 0,
        "points": 10
      },
      {
        "id": 3,
        "question": "Bir pizzanın 8 diliminden 3'ünü yedik. Geriye ne kadar pizza kaldı?",
        "type": "multiple_choice",
        "options": ["3/8", "5/8", "8/3", "8/5"],
        "correct": 1,
        "points": 10
      },
      {
        "id": 4,
        "question": "2/3 ile 4/6 kesirleri eşit midir?",
        "type": "true_false",
        "correct": true,
        "points": 10
      }
    ],
    "passing_score": 60
  }
}
```

## Quiz Attempt Structure

```json
{
  "id": "uuid",
  "student_id": "student-uuid",
  "quiz_id": "quiz-uuid",
  "score": 75,
  "answers": [
    {
      "question_id": 1,
      "selected_answer": 0,
      "is_correct": true,
      "points_earned": 10
    },
    {
      "question_id": 2,
      "selected_answer": 0,
      "is_correct": true,
      "points_earned": 10
    },
    {
      "question_id": 3,
      "selected_answer": 0,
      "is_correct": false,
      "points_earned": 0
    },
    {
      "question_id": 4,
      "selected_answer": true,
      "is_correct": true,
      "points_earned": 10
    }
  ],
  "time_spent": 420,
  "completed_at": "2024-01-15T10:30:00Z"
}
```

## Initial Content Data

### Grade 5 - Kesirler

```javascript
const grade5Content = [
  {
    title: "Kesirler - Giriş",
    content_type: "lesson",
    content_data: {
      description: "Kesirlerin temel tanımı",
      sections: [
        {
          title: "Kesir Nedir?",
          content: "Kesir, bir bütünün eşit parçalarından bir veya birkaçını gösterir."
        }
      ]
    }
  },
  {
    title: "Kesirler Quiz 1",
    content_type: "quiz",
    content_data: {
      questions: [
        {
          id: 1,
          question: "1/2 + 1/2 = ?",
          options: ["1", "2", "1/4", "1/2"],
          correct: 0
        },
        {
          id: 2,
          question: "3/4 hangi kesre eşittir?",
          options: ["6/8", "4/3", "1/4", "2/4"],
          correct: 0
        }
      ]
    }
  }
]
```

### Grade 6 - Denklemler

```javascript
const grade6Content = [
  {
    title: "Denklemler - Giriş",
    content_type: "lesson",
    content_data: {
      description: "Birinci dereceden denklemler",
      sections: [
        {
          title: "Denklem Nedir?",
          content: "Denklem, içinde bilinmeyen bulunan eşitliktir."
        }
      ]
    }
  },
  {
    title: "Denklemler Quiz 1",
    content_type: "quiz",
    content_data: {
      questions: [
        {
          id: 1,
          question: "x + 5 = 10 ise x = ?",
          options: ["5", "10", "15", "0"],
          correct: 0
        },
        {
          id: 2,
          question: "2x = 8 ise x = ?",
          options: ["2", "4", "6", "8"],
          correct: 1
        }
      ]
    }
  }
]
```

## Progress Tracking

```json
{
  "student_id": "uuid",
  "summary": {
    "total_lessons_completed": 2,
    "total_quizzes_taken": 3,
    "average_quiz_score": 75.5,
    "time_spent_total": 3600,
    "last_activity": "2024-01-15T10:30:00Z"
  },
  "by_topic": {
    "Kesirler": {
      "lessons_completed": 1,
      "quizzes_taken": 2,
      "average_score": 80,
      "best_score": 90
    },
    "Denklemler": {
      "lessons_completed": 1,
      "quizzes_taken": 1,
      "average_score": 70,
      "best_score": 70
    }
  }
}
```
