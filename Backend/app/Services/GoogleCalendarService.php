<?php

namespace App\Services;

/**
 * Class GoogleCalendarService.
 */
class GoogleCalendarService
{
public function createEvent($user, $turno, $paciente)
{
    $client = $this->getClient($user);

    $service = new \Google\Service\Calendar($client);

    $eventData = [
        'summary' => 'Terapia - ' . $paciente->nombre,
        'start' => [
            'dateTime' => $turno->fecha_inicio,
            'timeZone' => 'America/Argentina/Buenos_Aires',
        ],
        'end' => [
            'dateTime' => $turno->fecha_fin,
            'timeZone' => 'America/Argentina/Buenos_Aires',
        ],
        'attendees' => [
            ['email' => $paciente->email],
        ],
    ];

    // 👉 Si es online, agregamos Meet
    if ($turno->modalidad === 'online') {
        $eventData['conferenceData'] = [
            'createRequest' => [
                'requestId' => (string) \Str::uuid(),
                'conferenceSolutionKey' => ['type' => 'hangoutsMeet'],
            ],
        ];
    }

    $event = new \Google\Service\Calendar\Event($eventData);

    $createdEvent = $service->events->insert(
        'primary',
        $event,
        ['conferenceDataVersion' => 1]
    );

    return $createdEvent;
}
}
