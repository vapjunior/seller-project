<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Sale;
use Carbon\Carbon;
use SendGrid\Mail\From;
use SendGrid\Mail\Mail;
use SendGrid\Mail\To;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class SendDailyEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sl:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send daily email with sales report';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $today = Carbon::today()->format('Y-m-d');
        $salesToday = Sale::whereDate('date', $today)
                            ->select(DB::raw('count(sales.id) as total_sale, sum(sales.value) AS total_value'))
                            ->first();

        $this->sendEmail($salesToday);
    }

    private function sendEmail($sales) 
    {

        $name = getenv('ADMIN_NAME');
        $htmlContent = "<p>Oi $name, hoje tivemos <b>$sales->total_sale</b> novas vendas, com um total de <strong>R$ $sales->total_value</strong>";
        $textContent = "Oi $name, hoje tivemos $sales->total_sale novas vendas, com um total de R$ $sales->total_value";

        $date = Carbon::today()->format('d/m/Y');
        $from = new From(getenv('ADMIN_EMAIL'), $name);
        $subject = "Relatório de vendas do dia $date";
        $recipient = new To(getenv('ADMIN_EMAIL'), $name);

        $email = new Mail(); 
        $email->setFrom($from);
        $email->setSubject($subject);
        $email->addTo($recipient);
        $email->addContent("text/plain", $textContent);
        $email->addContent("text/html", $htmlContent);

        $sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
        try {
            $response = $sendgrid->send($email);
            $context = json_decode($response->body());
            if ($response->statusCode() == 202) {
                Log::info("Metric email has been sent", ["context" => $context]);
                dd($response);
            }else {
                Log::error("Failed to send metric email", ["context" => $context]);
                dd($response);
            }
        } catch (\Exception $e) {
            Log::error($e);
            dd($e);
        }
    }
}
